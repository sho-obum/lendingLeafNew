"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button.jsx";
import { Checkbox } from "../ui/checkbox.jsx";
import { AnimatedShinyText } from "../magicui/animated-shiny-text.jsx";
import ProgressBar from "../loan/ProgressBar.jsx";
import ThankYouScreen from "../loan/LoanOptionsScreen.jsx";
import axios from "axios";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
import LoanOptionsPage from "../loan/LoanOptionsScreen.jsx";

interface ApplicationFormProps {
  userId: string;
  // onGoHome: () => void;
}

interface FormData {
  userId: string;
  isVerified: boolean;
  formState: number;

  // Step 1: Basic Information
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  reqdloanAmount?: string;
  dateOfBirth?: string;
  residencePincode?: string;

  // Step 2: Property Type is captured as propertyType state
  propertyType?: string;

  // Step 3: Employment Type is captured as employmentType state
  employmentType?: string;

  // Step 4: Employment Details - Salaried
  netMonthlyIncome?: string;
  currentEmployer?: string;
  workEmail?: string;
  yearsOfExperience?: string;

  // Step 4: Employment Details - Self Employed Business
  annualTurnover?: string;
  businessType?: string;
  businessPincode?: string;
  yearsInBusiness?: string;

  // Step 4: Employment Details - Self Employed Professional
  annualReceipts?: string;
  profession?: string;
  officePincode?: string;
  yearsOfPractice?: string;

  // Terms and conditions
  termsAccepted?: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  userId,
  // onGoHome,
}) => {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [employmentType, setEmploymentType] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    userId,
    isVerified: false,
    formState: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Update formState whenever step changes
    setFormData((prev) => ({ ...prev, formState: step }));
  }, [step]);

  const validateStep = () => {
    setErrorMessage(null);

    if (step === 1) {
      if (!formData.fullName) {
        setErrorMessage("Full name is required");
        return false;
      }
      if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
        setErrorMessage("Valid 10-digit mobile number is required");
        return false;
      }
      if (!formData.email || !formData.email.includes("@")) {
        setErrorMessage("Valid email address is required");
        return false;
      }
      if (!formData.reqdloanAmount) {
        setErrorMessage("Loan amount is required");
        return false;
      }
      if (!formData.dateOfBirth) {
        setErrorMessage("Date of birth is required");
        return false;
      }
      if (
        !formData.residencePincode ||
        formData.residencePincode.length !== 6
      ) {
        setErrorMessage("Valid 6-digit residence pincode is required");
        return false;
      }
    } else if (step === 2) {
      if (!propertyType) {
        setErrorMessage("Please select a property type");
        return false;
      }
    } else if (step === 3) {
      if (!employmentType) {
        setErrorMessage("Please select your employment type");
        return false;
      }
    } else if (step === 4) {
      if (employmentType === "Salaried") {
        if (!formData.netMonthlyIncome) {
          setErrorMessage("Net monthly income is required");
          return false;
        }
        if (!formData.currentEmployer) {
          setErrorMessage("Current employer is required");
          return false;
        }
      } else if (employmentType === "Self Employed Business") {
        if (!formData.annualTurnover) {
          setErrorMessage("Annual turnover is required");
          return false;
        }
        if (!formData.businessType) {
          setErrorMessage("Business type is required");
          return false;
        }
      } else if (employmentType === "Self Employed Professional") {
        if (!formData.annualReceipts) {
          setErrorMessage("Annual receipts are required");
          return false;
        }
        if (!formData.profession) {
          setErrorMessage("Profession is required");
          return false;
        }
      }
    } else if (step === 5) {
      if (!formData.termsAccepted) {
        setErrorMessage("Please accept the terms and conditions to proceed");
        return false;
      }
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    try {
      setIsSubmitting(true);

      // Include property type and employment type in form data
      const dataToSubmit = {
        ...formData,
        propertyType: propertyType || undefined,
        employmentType: employmentType || undefined,
      };

      // Send data to API
      const response = await axios.post("/api/loans/save-step", dataToSubmit);

      if (response.data.success) {
        if (step < 5) {
          setStep(step + 1);
        }
      } else {
        setErrorMessage(response.data.message || "Failed to save form data");
      }
    } catch (error) {
      console.error("Error saving form step:", error);
      setErrorMessage("An error occurred while saving your information");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePropertyTypeSelect = (type: string) => {
    setPropertyType(type);
    setFormData({ ...formData, propertyType: type });
  };

  const handleEmploymentTypeSelect = (type: string) => {
    setEmploymentType(type);
    setFormData({ ...formData, employmentType: type });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTermsChange = (checked: boolean) => {
    setFormData({ ...formData, termsAccepted: checked });
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setIsSubmitting(true);

      // Include property type and employment type in form data
      const dataToSubmit = {
        ...formData,
        propertyType: propertyType || undefined,
        employmentType: employmentType || undefined,
      };

      // Send data to API
      const response = await axios.post(
        "/api/loans/submit-application",
        dataToSubmit
      );

      if (response.data.success) {
        setIsCompleted(true);
      } else {
        setErrorMessage(
          response.data.message || "Failed to submit application"
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrorMessage("An error occurred while submitting your application");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display thank you screen when completed
  if (isCompleted) {
    return <LoanOptionsPage />;
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-16 bg-white">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Progress Bar */}
        <div className="p-6 pt-8 md:p-10">
          <ProgressBar currentStep={step} totalSteps={5} />

          {/* Step Indicators */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex flex-col items-center ${
                  stepNumber > step ? "opacity-50" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 text-sm font-medium
                    ${
                      stepNumber < step
                        ? "bg-green-500 text-white"
                        : stepNumber === step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {stepNumber < step ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className="text-xs text-gray-700">
                  {stepNumber === 1 && "Personal"}
                  {stepNumber === 2 && "Property"}
                  {stepNumber === 3 && "Employment"}
                  {stepNumber === 4 && "Details"}
                  {stepNumber === 5 && "Submit"}
                </span>
              </div>
            ))}
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <AnimatedShinyText className="text-3xl md:text-4xl font-bold ">
              Home Loan Application
            </AnimatedShinyText>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <>
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
                Personal Information
              </h2>

              <form className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your name"
                      className="w-full border p-3 rounded-lg mt-1 bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.fullName || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Enter your 10-digit mobile number"
                      className="w-full border p-3 rounded-lg mt-1 bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.mobileNumber || ""}
                      onChange={handleInputChange}
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full border p-3 rounded-lg mt-1 bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="w-full border p-3 rounded-lg mt-1 bg-white border-gray-700 text-black focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.dateOfBirth || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Loan Amount (INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-700">
                        ₹
                      </span>
                      <input
                        type="text"
                        name="reqdloanAmount"
                        placeholder="Enter loan amount"
                        className="w-full border p-3 rounded-lg pl-8 mt-1 bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        value={formData.reqdloanAmount || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Residence Pincode
                    </label>
                    <input
                      type="text"
                      name="residencePincode"
                      placeholder="Enter 6-digit pincode"
                      className="w-full border p-3 rounded-lg mt-1 bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.residencePincode || ""}
                      onChange={handleInputChange}
                      maxLength={6}
                    />
                  </div>
                </div>
              </form>
            </>
          )}

          {/* Step 2: Property Type */}
          {step === 2 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                What is the type of property?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Plot",
                  "Commercial Property",
                  "Ready Property",
                  "Home Extension",
                  "Home Improvement",
                  "Self Construction",
                ].map((type) => (
                  <Button
                    key={type}
                    onClick={() => handlePropertyTypeSelect(type)}
                    className={`border px-6 py-8 rounded-lg transition ${
                      propertyType === type
                        ? "bg-green-500 text-white border-transparent"
                        : "bg-white text-black hover:bg-green-500 hover:text-white border-gray-700"
                    }`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Employment Type */}
          {step === 3 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                What employment type best describes you?
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {[
                  "Salaried",
                  "Self Employed Professional",
                  "Self Employed Business",
                ].map((type) => (
                  <Button
                    key={type}
                    onClick={() => handleEmploymentTypeSelect(type)}
                    className={`border px-6 py-8 rounded-lg transition ${
                      employmentType === type
                        ? "bg-green-500 text-white border-transparent"
                        : "bg-white text-black hover:bg-green-500 hover:text-white border-gray-700"
                    }`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </>
          )}

          {/* Step 4: Employment Details */}
          {step === 4 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                Kindly fill the details below
              </h2>

              {employmentType === "Salaried" && (
                <form className="grid gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Net Monthly Income
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-700">
                        ₹
                      </span>
                      <input
                        type="text"
                        name="netMonthlyIncome"
                        placeholder="Enter monthly income"
                        className="w-full border p-3 rounded-lg pl-8 bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        value={formData.netMonthlyIncome || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Residence Pincode
                    </label>
                    <input
                      type="text"
                      name="residencePincode"
                      placeholder="Enter pincode"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.residencePincode || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Current Employer
                    </label>
                    <input
                      type="text"
                      name="currentEmployer"
                      placeholder="Enter employer name"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.currentEmployer || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      name="workEmail"
                      placeholder="Enter work email address"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.workEmail || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      placeholder="Enter years of experience"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.yearsOfExperience || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              )}

              {employmentType === "Self Employed Business" && (
                <form className="grid gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Annual Turnover
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-700">
                        ₹
                      </span>
                      <input
                        type="text"
                        name="annualTurnover"
                        placeholder="Enter annual turnover"
                        className="w-full border p-3 rounded-lg pl-8 bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        value={formData.annualTurnover || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Business Type
                    </label>
                    <input
                      type="text"
                      name="businessType"
                      placeholder="Enter business type"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.businessType || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Business Pincode
                    </label>
                    <input
                      type="text"
                      name="businessPincode"
                      placeholder="Enter business pincode"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.businessPincode || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Years in Business
                    </label>
                    <input
                      type="number"
                      name="yearsInBusiness"
                      placeholder="Enter years in business"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.yearsInBusiness || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              )}

              {employmentType === "Self Employed Professional" && (
                <form className="grid gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Annual Receipts
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-700">
                        ₹
                      </span>
                      <input
                        type="text"
                        name="annualReceipts"
                        placeholder="Enter annual receipts"
                        className="w-full border p-3 rounded-lg pl-8 bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        value={formData.annualReceipts || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Profession
                    </label>
                    <input
                      type="text"
                      name="profession"
                      placeholder="Enter your profession"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.profession || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Office Pincode
                    </label>
                    <input
                      type="text"
                      name="officePincode"
                      placeholder="Enter office pincode"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.officePincode || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-1">
                      Years of Practice
                    </label>
                    <input
                      type="number"
                      name="yearsOfPractice"
                      placeholder="Enter years of practice"
                      className="w-full border p-3 rounded-lg bg-white border-gray-700 text-black placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      value={formData.yearsOfPractice || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              )}
            </>
          )}

          {/* Step 5: Review and Submit */}
          {step === 5 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                Review & Submit
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-medium text-lg mb-4">
                  Application Summary
                </h3>

                {/* Personal Information */}
                <div className="mb-4">
                  <h4 className="font-medium text-green-700 mb-2">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-600">Full Name:</div>
                    <div>{formData.fullName}</div>
                    <div className="text-gray-600">Mobile Number:</div>
                    <div>{formData.mobileNumber}</div>
                    <div className="text-gray-600">Email:</div>
                    <div>{formData.email}</div>
                    <div className="text-gray-600">Loan Amount:</div>
                    <div>₹{formData.reqdloanAmount}</div>
                    <div className="text-gray-600">Date of Birth:</div>
                    <div>{formData.dateOfBirth}</div>
                    <div className="text-gray-600">Residence Pincode:</div>
                    <div>{formData.residencePincode}</div>
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-4">
                  <h4 className="font-medium text-green-700 mb-2">
                    Property Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-600">Property Type:</div>
                    <div>{propertyType}</div>
                  </div>
                </div>

                {/* Employment Information */}
                <div className="mb-4">
                  <h4 className="font-medium text-green-700 mb-2">
                    Employment Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-600">Employment Type:</div>
                    <div>{employmentType}</div>

                    {employmentType === "Salaried" && (
                      <>
                        <div className="text-gray-600">Monthly Income:</div>
                        <div>₹{formData.netMonthlyIncome}</div>
                        <div className="text-gray-600">Current Employer:</div>
                        <div>{formData.currentEmployer}</div>
                        <div className="text-gray-600">Work Email:</div>
                        <div>{formData.workEmail}</div>
                        <div className="text-gray-600">
                          Years of Experience:
                        </div>
                        <div>{formData.yearsOfExperience}</div>
                      </>
                    )}

                    {employmentType === "Self Employed Business" && (
                      <>
                        <div className="text-gray-600">Annual Turnover:</div>
                        <div>₹{formData.annualTurnover}</div>
                        <div className="text-gray-600">Business Type:</div>
                        <div>{formData.businessType}</div>
                        <div className="text-gray-600">Business Pincode:</div>
                        <div>{formData.businessPincode}</div>
                        <div className="text-gray-600">Years in Business:</div>
                        <div>{formData.yearsInBusiness}</div>
                      </>
                    )}

                    {employmentType === "Self Employed Professional" && (
                      <>
                        <div className="text-gray-600">Annual Receipts:</div>
                        <div>₹{formData.annualReceipts}</div>
                        <div className="text-gray-600">Profession:</div>
                        <div>{formData.profession}</div>
                        <div className="text-gray-600">Office Pincode:</div>
                        <div>{formData.officePincode}</div>
                        <div className="text-gray-600">Years of Practice:</div>
                        <div>{formData.yearsOfPractice}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 py-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted || false}
                  onCheckedChange={handleTermsChange}
                  className="mt-1 h-5 w-5 text-green-500 rounded"
                />
                <div>
                  <label
                    htmlFor="termsAccepted"
                    className="block font-medium text-gray-800"
                  >
                    Terms and Conditions
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    I agree to the{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      Privacy Policy
                    </a>
                    . I consent to the processing of my personal information for
                    loan evaluation purposes.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center pt-4 border-t border-gray-200">
            {step > 1 ? (
              <Button
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-700 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back
              </Button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {isSubmitting ? "Processing..." : "Next"}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.termsAccepted}
                className={`px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors ${
                  !formData.termsAccepted || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Submit Application"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
