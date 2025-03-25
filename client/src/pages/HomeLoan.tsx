"use client";
import React, { useState, useEffect } from "react";
import HomeSection from "@/components/loan/HomeSection";
import ApplicationForm from "@/components/loan/ApplicationForm";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const HomeLoan: React.FC = () => {
  const [showApplication, setShowApplication] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleApplyClick = async () => {
    try {
      setIsLoading(true);
      // Generate a unique user ID from API
      const response = await axios.get("/api/loans/generate-id");
      
      if (response.data.success) {
        setUserId(response.data.userId);
        setShowApplication(true);
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
    setShowApplication(false);
    setUserId(null);
  };

  // If application is shown but no userId is available, something went wrong
  useEffect(() => {
    if (showApplication && !userId) {
      setShowApplication(false);
      toast({
        title: "Error",
        description: "Application could not be initialized properly.",
        variant: "destructive",
      });
    }
  }, [showApplication, userId, toast]);

  return (
    <div className="min-h-screen bg-white">
      {showApplication && userId ? (
        <ApplicationForm userId={userId} onGoHome={handleGoHome} />
      ) : (
        <HomeSection onApplyClick={handleApplyClick} />
      )}
    </div>
  );
};

export default HomeLoan;
