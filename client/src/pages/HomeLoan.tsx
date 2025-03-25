"use client";
import React, { useState, useEffect, useRef } from "react";
import HomeSection from "@/components/loan/HomeSection";
import ApplicationForm from "@/components/loan/ApplicationForm";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const HomeLoan: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  const handleApplyClick = async () => {
    try {
      setIsLoading(true);
      // Generate a unique user ID from API
      const response = await axios.get("/api/loans/generate-id");
      
      if (response.data.success) {
        setUserId(response.data.userId);
        
        // Scroll to the form section
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to start application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error starting application:", error);
      toast({
        title: "Error",
        description: "Failed to connect to the server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    setUserId(null);
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Home Section is always visible */}
      <HomeSection onApplyClick={handleApplyClick} />
      
      {/* Form Section */}
      <div ref={formRef} className="min-h-screen">
        {userId && <ApplicationForm userId={userId} onGoHome={handleGoHome} />}
      </div>
    </div>
  );
};

export default HomeLoan;
