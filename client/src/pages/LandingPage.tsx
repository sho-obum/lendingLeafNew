"use client";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";  // Import useLocation hook
import bgImage from "../assets/images/bgImage.png";  // Import your background image

const LandingPage = () => {
  const [, setLocation] = useLocation();  // Hook to navigate routes

  const handleGetStarted = () => {
    setLocation("/homeloan");  // Navigate to HomeLoan page
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center text-white px-4">
        <div className="mt-64">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Rooting Your Dreams
            <br />
            <span className="bg-gradient-to-r to-[#f8fc3c] from-[#0af186] text-transparent bg-clip-text font-montserrat font-extrabold">
              Branching Your Future
            </span>
          </h1>

          {/* Get Started Button */}
          <Button
            onClick={handleGetStarted}
            className="bg-transparent border border-white text-white px-6 py-3 rounded-full text-base font-thin font-montserrat hover:bg-white/10 transition mt-5"
          >
            Get Started
          </Button>
        </div>

        <p className="absolute bottom-4 text-sm text-gray-300 max-w-xl px-4 font-medium">
          Cultivating Financial Growth with Rooted Trust and Flourishing Opportunities.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
