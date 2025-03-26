import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Real API URL
const LENDING_LEAF_API_URL = "https://lendingleaf.in/api/create-user/";
const ACCESS_TOKEN = process.env.VITE_ACCESS_TOKEN;

interface LoanFormData {
  userId: string;
  userTrackId: string;
  isVerified: boolean;
  formState: number;
  mobileNumber: string;
  [key: string]: any;
}

/**
 * Generate a unique loan tracking number: HMLOAN<00-99><timestamp>
 */
const generateLoanTrackingNumber = (): string => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 100);
  return `HMLOAN${randomNum.toString().padStart(2, "0")}${timestamp}`;
};

/**
 * Generate a unique ID for loan application
 */
export const generateLoanUserId = async (req: Request, res: Response) => {
  try {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100001);
    const rawString = `${timestamp}_${randomNum}`;

    const encoder = new TextEncoder();
    const data = encoder.encode(rawString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const userId = `user_${hashHex}`;

    console.log("Generated Loan User ID:", userId);  // Log user ID

    return res.status(200).json({
      success: true,
      userId,
    });
  } catch (error) {
    console.error("Error generating loan user ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate user ID",
    });
  }
};

/**
 * Generate loan tracking user ID
 */
export const generateLoanTrackUserId = async (req: Request, res: Response) => {
  try {
    const userTrackId = generateLoanTrackingNumber();

    console.log("Generated Loan Tracking ID:", userTrackId);  // Log userTrackId

    return res.status(200).json({
      success: true,
      userTrackId,
    });
  } catch (error) {
    console.error("Error generating loan userTrack ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate loan tracking ID",
    });
  }
};

/**
 * Save form data for a specific step with loan tracking number
 */
export const saveFormStep = async (req: Request, res: Response) => {
  try {
    const formData: LoanFormData = req.body;

    if (!formData.userId || !formData.mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "User ID and mobile number are required",
      });
    }

    // Assign loan tracking number if not already present
    if (!formData.userTrackId) {
      formData.userTrackId = generateLoanTrackingNumber();
      console.log("Generated new userTrackId:", formData.userTrackId);  // Log new userTrackId
    } else {
      console.log("Existing userTrackId:", formData.userTrackId);  // Log existing userTrackId
    }

    // Validate required fields based on form state
    if (formData.formState === 1) {
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.dateOfBirth ||
        !formData.reqdloanAmount ||
        !formData.residencePincode
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields for step 1",
        });
      }
    } else if (formData.formState === 2 && !formData.propertyType) {
      return res.status(400).json({
        success: false,
        message: "Property type is required",
      });
    } else if (formData.formState === 3 && !formData.employmentType) {
      return res.status(400).json({
        success: false,
        message: "Employment type is required",
      });
    } else if (formData.formState === 4) {
      if (
        formData.employmentType === "Salaried" &&
        (!formData.netMonthlyIncome || !formData.currentEmployer)
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields for salaried employment",
        });
      } else if (
        formData.employmentType === "Self Employed Business" &&
        (!formData.annualTurnover || !formData.businessType)
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields for self-employed business",
        });
      } else if (
        formData.employmentType === "Self Employed Professional" &&
        (!formData.annualReceipts || !formData.profession)
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields for self-employed professional",
        });
      }
    }

    // Send data to external API
    const apiData = {
      ...formData,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: LENDING_LEAF_API_URL,
      headers: {
        ACCESS: ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      data: apiData,
    };

    try {
      const apiResponse = await axios.request(config);
      console.log("API Response:", apiResponse.data);
    } catch (axiosError) {
      console.error("Axios Error:", axiosError);
    }

    console.log("Final formData with userTrackId:", JSON.stringify(formData, null, 2));  // Log complete form data

    return res.status(200).json({
      success: true,
      message: `Successfully saved form data for step ${formData.formState}`,
      userTrackId: formData.userTrackId,
    });
  } catch (error) {
    console.error("Error saving form step:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save form data",
    });
  }
};

/**
 * Submit final application with loan tracking number
 */
export const submitApplication = async (req: Request, res: Response) => {
  try {
    const formData: LoanFormData = req.body;

    if (!formData.userId || !formData.termsAccepted) {
      return res.status(400).json({
        success: false,
        message: "User ID and terms acceptance are required",
      });
    }

    // Assign loan tracking number if not present
    if (!formData.userTrackId) {
      formData.userTrackId = generateLoanTrackingNumber();
      console.log("Generated new userTrackId in submit:", formData.userTrackId);  // Log new userTrackId
    } else {
      console.log("Existing userTrackId in submit:", formData.userTrackId);  // Log existing userTrackId
    }

    // Send the final submission to the API
    const apiData = {
      ...formData,
      isCompleted: true,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: LENDING_LEAF_API_URL,
      headers: {
        ACCESS: ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      data: apiData,
    };

    try {
      const apiResponse = await axios.request(config);
      console.log("Final Submission API Response:", apiResponse.data);

      if (!apiResponse.data.success) {
        return res.status(400).json({
          success: false,
          message: "Failed to submit final application",
        });
      }
    } catch (axiosError) {
      console.error("Axios Error:", axiosError);
    }

    console.log("Final submission data with userTrackId:", JSON.stringify(formData, null, 2));  // Log final submission data

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: formData.userTrackId,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};
