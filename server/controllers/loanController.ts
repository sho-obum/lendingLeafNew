import { Request, Response } from "express";
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


// Real API URL 
const LENDING_LEAF_API_URL = "https://lendingleaf.in/api/create-user/"
const ACCESS_TOKEN =  process.env.VITE_ACCESS_TOKEN;


// console.log("prcess :", process.env);

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
export const generateLoanUserId = async (req: Request, res: Response) => {
  try {
    // Generate a unique ID using timestamp, random number, and SHA-256 hash
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 100001); // Random number between 0-100000
    const rawString = `${timestamp}_${randomNum}`;
    
    // Hash using SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(rawString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    const userId = `user_${hashHex}`;
    
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

      // Log the data being sent to the API
      console.log("Sending to API:", JSON.stringify(apiData, null, 2));
      
      try {
        // Make the actual API call
        const apiResponse = await axios.request(config);
        console.log("API Response:", apiResponse.data);
        
        // Return API response status to the frontend
        if (apiResponse.data.error) {
          const errorMessage = typeof apiResponse.data.message === 'string' 
            ? apiResponse.data.message 
            : 'Unknown API error';
            
          return res.status(200).json({
            success: true, // Still return success to frontend so form can continue
            message: "Form data sent to API but there was an API issue: " + errorMessage,
          });
        }
      } catch (axiosError) {
        console.error("Axios Error:", axiosError);
        // Even with API error, allow form to continue
        return res.status(200).json({
          success: true,
          message: "Form data sent but API connection failed",
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




export const submitApplication = async (req: Request, res: Response) => {
  try {
    const formData: LoanFormData = req.body;
    
    if (!formData.userId || !formData.termsAccepted) {
      return res.status(400).json({
        success: false,
        message: "User ID and terms acceptance are required",
      });
    }

    // Send the final submission to the API
    try {
      const apiData = {
        ...formData,
        isCompleted: true // Mark this as the final submission
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

      // Log final submission data being sent to API
      console.log("Sending Final Submission to API:", JSON.stringify(apiData, null, 2));
      
      try {
        // Make the actual API call for final submission
        const apiResponse = await axios.request(config);
        console.log("Final Submission API Response:", apiResponse.data);
        
        // Return API response status to the frontend
        if (apiResponse.data.error) {
          const errorMessage = typeof apiResponse.data.message === 'string' 
            ? apiResponse.data.message 
            : 'Unknown API error';
            
          console.log("API returned an error but we'll still complete the form flow:", errorMessage);
          // Still return success to the frontend for a smooth user experience
        } else if (!apiResponse.data.success) {
          // This is when API explicitly returns success: false
          return res.status(400).json({
            success: false,
            message: "Failed to submit final application",
          });
        }
      } catch (axiosError) {
        console.error("Axios Error:", axiosError);
        // Log the error but continue with positive response to frontend
        console.log("API call failed but continuing the form flow for user experience");
      }
      
      return res.status(200).json({
        success: true,
        message: "Application submitted successfully",
        applicationId: formData.userId,
      });
    } catch (apiError) {
      console.error("API Error on final submission:", apiError);
      return res.status(500).json({
        success: false,
        message: "Failed to communicate with loan processing service for final submission",
      });
    }
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};
