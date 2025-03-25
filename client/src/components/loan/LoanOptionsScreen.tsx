import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import BajajLogo from "../../assets/images/bajaj-finserv-logo.png"
// Bank data type
interface BankData {
  bankName: string;
  bankLogo: string;
  features: string[];
  interestRate: string;
  emi: string;
  processingFee: string;
  tenure: string;
}

// Define props interface for navigation
interface LoanOptionsPageProps {
  onGoHome: () => void;
}

const LoanOptionsPage: React.FC<LoanOptionsPageProps> = ({ onGoHome }) => {
  // Single bank data - Bajaj Finserv
  const bankData: BankData = {
    bankName: "Bajaj Finserv",
    bankLogo: "./../assets/images/bajaj-finserv-logo.png",
    features: [
      "Loan amounts up to Rs 5 Cr",
      "Flexible repayment tenure",
      "Minimal documentation",
      "Instant loan approval",
      
    ],
    interestRate: "7.5% - 14.5%",
    emi: "₹ 720",
    processingFee: "0.5%",
    tenure: "30 Yrs"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Congratulations Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 mx-auto">
            <CheckIcon className="text-white h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Congratulations!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            You are eligible for a home loan with Bajaj Finserv
          </p>
          <p className="text-lg text-gray-500 mb-8">
            Explore the top offer tailored just for you
          </p>
        </div>

        {/* Bank Card Section */}
        <div className="bg-white border-2 border-green-500 rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bank Logo and Name */}
            <div className="flex flex-col items-center justify-between mb-4">
              
              <img 
                src={BajajLogo} 
                alt={`${bankData.bankName} logo`} 
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900">{bankData.bankName}</h3>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Key Features:
              </h4>
              <ul className="space-y-2 text-gray-600">
                {bankData.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
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

            {/* Loan Details */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Loan Details
              </h4>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="font-bold">{bankData.interestRate}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span className="font-bold">{bankData.processingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure:</span>
                  <span className="font-bold">{bankData.tenure}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-4">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
                <Button className="w-full">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Home Button */}
        <div className="text-center mt-12">
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
  );
};

export default LoanOptionsPage;
