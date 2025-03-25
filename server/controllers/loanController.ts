import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { storage } from "../storage";

// Mock API URL 
const LENDING_LEAF_API_URL = "https://lendingleaf.in/api/create-user/";
const ACCESS_TOKEN = "d80ab55f5b7538f146d96f171f7eeefb";

interface LoanFormData {
  userId: string;
  isVerified: boolean;
  formState: number;
  mobileNumber: string;
  // And all other potential form fields
  [key: string]: any;
}

/**
 * Generate a unique ID for the loan application
 */
export const generateLoanUserId = (req: Request, res: Response) => {
  try {
    // Generate a unique userId
    const userId = `LOAN${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
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
 * Save form data for a specific step
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

    // Validate required fields based on form state
    if (formData.formState === 1) {
      if (!formData.fullName || !formData.email || !formData.dateOfBirth || !formData.reqdloanAmount || !formData.residencePincode) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields for step 1",
        });
      }
    } else if (formData.formState === 2) {
      if (!formData.propertyType) {
        return res.status(400).json({
          success: false,
          message: "Property type is required",
        });
      }
    } else if (formData.formState === 3) {
      if (!formData.employmentType) {
        return res.status(400).json({
          success: false,
          message: "Employment type is required",
        });
      }
    } else if (formData.formState === 4) {
      // Validate based on employment type
      if (formData.employmentType === "Salaried") {
        if (!formData.netMonthlyIncome || !formData.currentEmployer) {
          return res.status(400).json({
            success: false,
            message: "Missing required fields for salaried employment",
          });
        }
      } else if (formData.employmentType === "Self Employed Business") {
        if (!formData.annualTurnover || !formData.businessType) {
          return res.status(400).json({
            success: false,
            message: "Missing required fields for self-employed business",
          });
        }
      } else if (formData.employmentType === "Self Employed Professional") {
        if (!formData.annualReceipts || !formData.profession) {
          return res.status(400).json({
            success: false,
            message: "Missing required fields for self-employed professional",
          });
        }
      }
    }

    // Send data to external API
    try {
      const apiData = {
        ...formData
      };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: LENDING_LEAF_API_URL,
        headers: { 
          'ACCESS': ACCESS_TOKEN, 
          'Content-Type': 'application/json'
        },
        data: apiData
      };

      // Comment out the actual API call in development if needed
      // const apiResponse = await axios.request(config);
      // console.log("API Response:", apiResponse.data);
      
      // For now, simulate successful API response
      const apiResponse = { data: { success: true } };

      if (!apiResponse.data.success) {
        return res.status(400).json({
          success: false,
          message: "Failed to process loan application data",
        });
      }
    } catch (apiError) {
      console.error("API Error:", apiError);
      return res.status(500).json({
        success: false,
        message: "Failed to communicate with loan processing service",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully saved form data for step ${formData.formState}`,
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
 * Submit the final application
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

    // Here you would typically finalize the application in your system
    // and perhaps trigger additional workflows

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: formData.userId,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};
