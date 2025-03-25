import React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface ThankYouScreenProps {
  applicationId: string;
  onGoHome: () => void;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({
  applicationId,
  onGoHome,
}) => {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
        <CheckIcon className="text-white h-10 w-10" />
      </div>
      <h3 className="text-2xl font-heading font-semibold mb-2">
        Application Submitted Successfully!
      </h3>
      <p className="text-neutral-600 mb-6">
        Thank you for applying for a home loan with us. Your application has been
        received.
      </p>
      <div className="bg-neutral-50 p-4 rounded-lg inline-block">
        <p className="text-neutral-800 font-medium">
          Application ID: <span className="text-green-600">{applicationId}</span>
        </p>
      </div>
      <p className="mt-6 text-sm text-neutral-600">
        We will review your application and get back to you within 24 hours.
      </p>
      <Button
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        onClick={onGoHome}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default ThankYouScreen;
