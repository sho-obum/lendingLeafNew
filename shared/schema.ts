import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const loanApplications = pgTable("loan_applications", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  mobileNumber: text("mobile_number").notNull(),
  isVerified: boolean("is_verified").default(false),
  formState: integer("form_state").default(1),
  
  // Step 1: Basic Information
  fullName: text("full_name"),
  email: text("email"),
  reqdloanAmount: text("reqd_loan_amount"),
  dateOfBirth: text("date_of_birth"),
  residencePincode: text("residence_pincode"),
  
  // Step 2: Property Type
  propertyType: text("property_type"),
  
  // Step 3: Employment Type
  employmentType: text("employment_type"),
  
  // Step 4: Employment Details - Salaried
  netMonthlyIncome: text("net_monthly_income"),
  currentEmployer: text("current_employer"),
  workEmail: text("work_email"),
  yearsOfExperience: text("years_of_experience"),
  
  // Step 4: Employment Details - Self Employed Business
  annualTurnover: text("annual_turnover"),
  businessType: text("business_type"),
  businessPincode: text("business_pincode"),
  yearsInBusiness: text("years_in_business"),
  
  // Step 4: Employment Details - Self Employed Professional
  annualReceipts: text("annual_receipts"),
  profession: text("profession"),
  officePincode: text("office_pincode"),
  yearsOfPractice: text("years_of_practice"),
  
  // Step 5: Terms and conditions
  termsAccepted: boolean("terms_accepted"),
});

export const insertLoanApplicationSchema = createInsertSchema(loanApplications).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoanApplication = typeof loanApplications.$inferSelect;
export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>;
