import React from 'react';
import Navbar from '../Navbar.jsx'
import { Button } from "../ui/button.jsx";
import { CheckIcon, LockIcon } from "lucide-react";

// Bank data type
interface BankData {
  bankName: string;
  bankLogo: string;
  coverImage: string;
  features: string[];
}

// Props interface for navigation
interface LoanOptionsPageProps {
  onGoHome: () => void;
  applicationLoanId: string; // New prop for loan ID
}

const LoanOptionsPage: React.FC<LoanOptionsPageProps> = ({ 
  onGoHome, 
  applicationLoanId 
}) => {
  // Bank data array
  const banksData: BankData[] = [
    {
      bankName: "Bajaj Finserv",
      bankLogo: "/path/to/bajaj-logo.png",
      coverImage: "/path/to/bajaj-cover.jpg",
      features: [
        "Loan amounts up to Rs 5 Cr",
        "Flexible repayment options",
        "Instant loan approval"
      ]
    },
    {
      bankName: "HDFC Bank",
      bankLogo: "/path/to/hdfc-logo.png",
      coverImage: "/path/to/hdfc-cover.jpg",
      features: [
        "Competitive interest rates",
        "Quick processing",
        "Nationwide presence"
      ]
    },
    {
      bankName: "SBI Home Loans",
      bankLogo: "/path/to/sbi-logo.png",
      coverImage: "/path/to/sbi-cover.jpg",
      features: [
        "Lowest interest rates",
        "Long repayment tenure",
        "Minimal documentation"
      ]
    },
    {
      bankName: "ICICI Bank",
      bankLogo: "/path/to/icici-logo.png",
      coverImage: "/path/to/icici-cover.jpg",
      features: [
        "Digital loan application",
        "Customized loan solutions",
        "Quick disbursal"
      ]
    },
    {
      bankName: "Axis Bank",
      bankLogo: "/path/to/axis-logo.png",
      coverImage: "/path/to/axis-cover.jpg",
      features: [
        "Attractive interest rates",
        "Flexible loan terms",
        "Online account management"
      ]
    },
    {
      bankName: "PNB Housing",
      bankLogo: "/path/to/pnb-logo.png",
      coverImage: "/path/to/pnb-cover.jpg",
      features: [
        "Affordable housing loans",
        "Nationwide service",
        "Competitive pricing"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Adjusted for Navbar */}
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
                className={`bg-white border rounded-lg shadow-md overflow-hidden relative 
                  ${index === 0 ? '' : 'opacity-50 pointer-events-none'}`}
              >
                {/* Blur Overlay for all except first card */}
                {index !== 0 && (
                  <div className="absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm z-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                      <LockIcon className="h-12 w-12 mx-auto mb-2" />
                      <p>Locked Offer</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2">
                  {/* Left Section: Logo and Bank Name */}
                  <div className="p-6 flex flex-col items-center justify-center">
                    <img 
                      src={bank.bankLogo} 
                      alt={`${bank.bankName} logo`} 
                      className="w-32 h-32 object-contain mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 text-center">
                      {bank.bankName}
                    </h3>
                  </div>

                  {/* Right Section: Features and Interest Rate */}
                  <div className="p-6 bg-gray-50">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">
                      Key Features:
                    </h4>
                    <ul className="space-y-2 text-gray-600 mb-4">
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

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-bold text-green-600">7.5% - 14.5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Apply Button for Each Bank */}
                <div className="p-4 border-t">
                  <Button 
                    className="w-full"
                    disabled={index !== 0}
                  >
                    Apply Now
                  </Button>
                </div>
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
    </div>
  );
};

export default LoanOptionsPage;