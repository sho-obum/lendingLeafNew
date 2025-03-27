import express from "express";
import {
  generateLoanUserId,
  generateLoanTrackUserId,
  saveFormStep,
  submitApplication,
} from "./controllers/loanController.js";

const router = express.Router();

// Loan application routes
router.get("/generate-id", generateLoanUserId);
router.get("/generate-trackid", generateLoanTrackUserId);
router.post("/save-step", saveFormStep);
router.post("/submit-application", submitApplication);

export function registerRoutes(app: express.Express) {
  app.use("/api/loans", router);
}
