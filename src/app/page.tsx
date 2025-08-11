"use client";

import { useState } from "react";
import { UploadForm } from "@/components/UploadForm";
import { ResultCard } from "@/components/ResultCard";
import { toast } from "sonner";

interface AnalysisResult {
  fit: "Yes" | "No";
  reason: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (jobDescription: string, cvFile: File) => {
    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("jobDescription", jobDescription);
      formData.append("cvFile", cvFile);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze CV");
      }

      const analysisResult = await response.json();
      setResult(analysisResult);
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during analysis"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Talent Acquisition Agent
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a job description and candidate CV to get an AI-powered
            analysis of the candidate&apos;s fit for the position.
          </p>
        </div>

        <UploadForm onSubmit={handleSubmit} isLoading={isLoading} />

        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}
