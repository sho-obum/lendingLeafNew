import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: progressWidth }}
      />
    </div>
  );
};

export default ProgressBar;
