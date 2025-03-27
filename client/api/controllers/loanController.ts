import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const LENDING_LEAF_API_URL = process.env.LENDING_LEAF_API_URL || "https://loan.lendingleaf.in/api/create-user/";
const ACCESS_TOKEN = process.env.VITE_ACCESS_TOKEN;

export const generateLoanUserId = async (req: Request, res: Response) => {
  try {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100001);
    const userId = `user_${timestamp}_${randomNum}`;

    console.log("Generated Loan User ID:", userId);

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

export const generateLoanTrackUserId = async (req: Request, res: Response) => {
  try {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100);
    const trackId = `track_${timestamp}_${randomNum}`;

    console.log("Generated Loan Tracking ID:", trackId);

    return res.status(200).json({
      success: true,
      trackId,
    });
  } catch (error) {
    console.error("Error generating loan track ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate track ID",
    });
  }
};

export const saveFormStep = async (req: Request, res: Response) => {
  try {
    const formData = req.body;

    const config = {
      method: "post",
      url: LENDING_LEAF_API_URL,
      headers: {
        ACCESS: ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      data: formData,
    };

    const response = await axios(config);
    console.log("Form step saved:", response.data);

    return res.status(200).json({
      success: true,
      message: "Form step saved successfully",
    });
  } catch (error) {
    console.error("Error saving form step:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save form step",
    });
  }
};

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const formData = req.body;

    const config = {
      method: "post",
      url: LENDING_LEAF_API_URL,
      headers: {
        ACCESS: ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      data: formData,
    };

    const response = await axios(config);
    console.log("Application submitted:", response.data);

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};
