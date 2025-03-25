import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateLoanUserId, saveFormStep, submitApplication, getApplications } from "./controllers/loanController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Loan application routes
  const loanRoutes = express.Router();
  
  // Generate a unique ID for a new loan application
  loanRoutes.get("/generate-id", generateLoanUserId);
  
  // Save form data for a specific step
  loanRoutes.post("/save-step", saveFormStep);
  
  // Submit the complete application
  loanRoutes.post("/submit-application", submitApplication);
  
  // Get all applications
  loanRoutes.get("/applications", getApplications);
  
  // Get a specific application by ID
  loanRoutes.get("/applications/:id", getApplications);

  // Register the loan routes
  app.use("/api/loans", loanRoutes);

  const httpServer = createServer(app);

  return httpServer;
}
