"use client";
import React from "react";
import { Button } from "../ui/button.jsx";
import { ArrowRightIcon, CheckCircleIcon, ChevronRight } from "lucide-react";
import bgImage from "../../assets/images/bgImage2.png";  // Import your background image
import homePhoto from "../../assets/images/homeLoanBg.png";  // Import your background image

interface HomeSectionProps {
  onApplyClick: () => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onApplyClick }) => {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/50 w-full h-full absolute inset-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 z-10 ">

        {/* Breadcrumb */}
        <div className="text-white mb-8 lg:mt-4">
          <nav className="flex items-center text-sm">
            <a href="/" className="hover:underline cursor-pointer">Home</a>
            <ChevronRight size={18} className="mx-2" />
            <span className="text-gray-300">Home Loan</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-white">
            <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
              Make Your Dream Home a Reality with LendingLeaf
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg">
              Quick approvals, competitive interest rates, and hassle-free processing to help you finance your perfect home.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start">
                <CheckCircleIcon className="text-amber-300 mr-3 mt-0.5 h-6 w-6" />
                <div>
                  <h3 className="font-medium text-lg">Competitive Interest Rates</h3>
                  <p className="opacity-80">Starting from 8.25% p.a. with flexible repayment options</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="text-amber-300 mr-3 mt-0.5 h-6 w-6" />
                <div>
                  <h3 className="font-medium text-lg">Quick Approvals</h3>
                  <p className="opacity-80">Get in-principle approval within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="text-amber-300 mr-3 mt-0.5 h-6 w-6" />
                <div>
                  <h3 className="font-medium text-lg">Minimal Documentation</h3>
                  <p className="opacity-80">Simplified process with minimal paperwork</p>
                </div>
              </div>
            </div>
            <Button
              onClick={onApplyClick}
              className="px-8 py-6 bg-white text-green-600 hover:bg-neutral-50 rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-xl flex items-center"
            >
              Apply Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="hidden lg:block">
            <img
              src={homePhoto}
              alt="Modern family home"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[56px]"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HomeSection;
