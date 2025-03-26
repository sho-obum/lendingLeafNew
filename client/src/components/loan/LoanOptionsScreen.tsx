import React from 'react';
import { Button } from "../ui/button.jsx";
import { CheckIcon } from "lucide-react";

// Bank data type
interface BankData {
  bankName: string;
  bankLogo: string;
  coverImage: string;
  features: string[];
}

const LoanOptionsGrid: React.FC = () => {
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-6">
        {banksData.map((bank, index) => (
          <div 
            key={index} 
            className="bg-white border rounded-lg shadow-md overflow-hidden"
          >
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
                    <span className="font-bold text-green-600">**7.5% - 14.5%**</span>
                  </div>
                </div>

                {/* Invisible Cover Image (for blue overlay) */}
                <div className="absolute inset-0 opacity-0">
                  <img 
                    src={bank.coverImage} 
                    alt={`${bank.bankName} cover`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanOptionsGrid;