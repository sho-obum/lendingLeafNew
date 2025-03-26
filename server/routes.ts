import express, { type Express } from "express";
import { createServer, type Server } from "http";
import {
  generateLoanUserId,
  generateLoanTrackUserId,
  saveFormStep,
  submitApplication,
} from "./controllers/loanController.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Loan application routes
  const loanRoutes = express.Router();

  // Generate a unique ID for a new loan application
  loanRoutes.get("/generate-id", generateLoanUserId);
  
  // Generate a unique ID for a new loan application tracking
  loanRoutes.get("/generate-trackid", generateLoanTrackUserId);

  // Save form data for a specific step
  loanRoutes.post("/save-step", saveFormStep);

  // Submit the complete application
  loanRoutes.post("/submit-application", submitApplication);

  // Register the loan routes
  app.use("/api/loans", loanRoutes);

  const httpServer = createServer(app);

  return httpServer;
}
