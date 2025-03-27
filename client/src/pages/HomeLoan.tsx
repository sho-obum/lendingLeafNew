"use client";
import React, { useState } from "react";
import HomeSection from "../components/loan/HomeSection.jsx";
import ApplicationForm from "../components/loan/ApplicationForm.jsx";
import axios from "axios";
import { useToast } from "../hooks/use-toast.js";

const HomeLoan: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);  // Hide form initially

  const handleApplyClick = async () => {
    try {
      setIsLoading(true);
      
      // Generate a unique user ID from API
      const response = await axios.get("/api/loans/generate-id");
      
      if (response.data.success) {
        setUserId(response.data.userId);
        setShowForm(true);  // Show form only when "Apply" is clicked

        // Scroll to form section
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 100);
        
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
    setShowForm(false);  // Hide form when going home
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Home Section */}
      <HomeSection onApplyClick={handleApplyClick} />

      {/* Form Section (Hidden until Apply is clicked) */}
      {showForm && userId && (
        <div className="min-h-screen">
          <ApplicationForm userId={userId} onGoHome={handleGoHome} />
        </div>
      )}

      
    </div>
  );
};

export default HomeLoan;
