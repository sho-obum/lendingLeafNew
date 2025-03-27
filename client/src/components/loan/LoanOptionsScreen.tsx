import React, { useState } from 'react';
import Navbar from '../Navbar.jsx'
import { Button } from "../ui/button.jsx";
import { CheckIcon, LockIcon } from "lucide-react";

// Bank data type with new active prop
interface BankData {
  bankName: string;
  bankLogo: string;
  features: string[];
  isActive: boolean;
  interestRate: string;
}

// Props interface for navigation
interface LoanOptionsPageProps {
  onGoHome: () => void;
  applicationLoanId: string;
}

const LoanOptionsPage: React.FC<LoanOptionsPageProps> = ({ 
  onGoHome, 
  applicationLoanId 
}) => {
  // State for selected bank
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  // Bank data array with detailed information
  const banksData: BankData[] = [
    {
      bankName: "Bajaj Finserv",
      bankLogo: "https://pixelpod.in/admin/uploads/bajaj-finserv-logo1743060868.png",
      features: [
        "Loan amounts up to Rs 5 Cr",
        "Flexible repayment options",
        "Instant loan approval"
      ],
      isActive: true,
      interestRate: "7.5% - 9.5%"
    },
    {
      bankName: "HDFC Bank",
      bankLogo: "https://pixelpod.in/admin/uploads/hdfc-bank1743060749.png",
      features: [
        "Competitive interest rates",
        "Quick processing",
        "Nationwide presence"
      ],
      isActive: false,
      interestRate: "8.5% - 10.5%"
    },
    {
      bankName: "SBI Home Loans",
      bankLogo: "https://pixelpod.in/admin/uploads/sbi1743061036.png",
      features: [
        "Lowest interest rates",
        "Long repayment tenure",
        "Minimal documentation"
      ],
      isActive: false,
      interestRate: "8.0% - 9.0%"
    },
    {
      bankName: "ICICI Bank",
      bankLogo: "https://pixelpod.in/admin/uploads/icici1743060843.png",
      features: [
        "Digital loan application",
        "Customized loan solutions",
        "Quick disbursal"
      ],
      isActive: false,
      interestRate: "9.0% - 11.0%"
    },
    {
      bankName: "Axis Bank",
      bankLogo: "https://pixelpod.in/admin/uploads/axis1743060644.png",
      features: [
        "Attractive interest rates",
        "Flexible loan terms",
        "Online account management"
      ],
      isActive: false,
      interestRate: "8.5% - 10.0%"
    },
    {
      bankName: "PNB Housing",
      bankLogo: "https://pixelpod.in/admin/uploads/pnb1743060839.png",
      features: [
        "Affordable housing loans",
        "Nationwide service",
        "Competitive pricing"
      ],
      isActive: false,
      interestRate: "7.9% - 9.5%"
    }
  ];

  // Handle bank application
  const handleBankApplication = (bankName: string) => {
    // Placeholder for application logic
    console.log(`Applied to ${bankName}`);
    setSelectedBank(bankName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Thank You Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 mx-auto">
              <CheckIcon className="text-white h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Your Loan Application is Processed
            </p>
            <p className="text-lg text-gray-500 mb-8">
              Application Loan ID: 
              <span className="font-bold ml-2 text-green-600">
                {applicationLoanId}
              </span>
            </p>
          </div>

          {/* Grid of Bank Options */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {banksData.map((bank, index) => (
              <div 
                key={index} 
                className="bg-white border rounded-lg shadow-md overflow-hidden relative"
              >
                {/* First Row: Logo and Title */}
                <div className="flex items-center p-6 border-b">
                  <img 
                    src={bank.bankLogo} 
                    alt={`${bank.bankName} logo`} 
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900">
                    {bank.bankName}
                  </h3>
                </div>

                {/* Key Features Section */}
                <div className="p-6 border-b">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">
                    Key Features:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    {bank.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-start"
                      >
                        <svg 
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interest Rate Section */}
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-bold text-green-600">
                      {bank.interestRate}
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="p-4">
                  <Button 
                    className="w-full"
                    disabled={!bank.isActive}
                    onClick={() => handleBankApplication(bank.bankName)}
                  >
                    {bank.isActive ? 'Apply Now' : 'Locked'}
                  </Button>
                </div>

                {/* Overlay for Inactive Banks */}
                {!bank.isActive && (
                  <div className="absolute inset-0 bg-green-500 bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-white text-center">
                      <LockIcon className="h-12 w-12 mx-auto mb-2" />
                      <p>Offer Locked</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={onGoHome}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Optional: Modal or Toast for Application Confirmation */}
      {selectedBank && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <CheckIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Application Submitted</h2>
            <p className="text-gray-600 mb-6">
              Your application to {selectedBank} has been successfully submitted.
            </p>
            <Button 
              onClick={() => setSelectedBank(null)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanOptionsPage;