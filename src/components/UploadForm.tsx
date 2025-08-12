"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Briefcase } from "lucide-react";

interface UploadFormProps {
  onSubmit: (jobDescription: string, cvFile: File) => void;
  isLoading: boolean;
}

export function UploadForm({ onSubmit, isLoading }: UploadFormProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    jobDescription?: string;
    cvFile?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validate form
    const newErrors: { jobDescription?: string; cvFile?: string } = {};

    if (!jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
    }

    if (!cvFile) {
      newErrors.cvFile = "CV file is required";
    } else if (
      !cvFile.type.match(
        /^(application\/pdf|text\/plain|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/
      )
    ) {
      newErrors.cvFile =
        "Please upload a PDF (.pdf), Word document (.docx), or text file (.txt)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    if (cvFile) {
      onSubmit(jobDescription, cvFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setErrors((prev) => ({ ...prev, cvFile: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          AI-Powered Analysis
        </CardTitle>
        <p className="text-gray-300 text-lg mt-2">
          Upload job details and candidate CV for instant AI evaluation
        </p>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Description Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <Label
                htmlFor="jobDescription"
                className="text-lg font-semibold text-white"
              >
                Job Description
              </Label>
            </div>

            <Textarea
              id="jobDescription"
              placeholder="Paste the detailed job description here... Include requirements, responsibilities, and qualifications..."
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setErrors((prev) => ({ ...prev, jobDescription: undefined }));
              }}
              className={`min-h-[140px] bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 ${
                errors.jobDescription ? "border-red-400 ring-red-400/20" : ""
              }`}
            />
            {errors.jobDescription && (
              <p className="text-sm text-red-400 flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                {errors.jobDescription}
              </p>
            )}
          </div>

          {/* CV Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <Label
                htmlFor="cvFile"
                className="text-lg font-semibold text-white"
              >
                Candidate CV
              </Label>
            </div>

            <div className="relative">
              <Input
                id="cvFile"
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className={`bg-white/5 border-white/20 text-white file:bg-gradient-to-r file:from-purple-500 file:to-blue-500 file:border-0 file:text-white file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:mr-4 file:font-medium hover:file:from-purple-600 hover:file:to-blue-600 transition-all duration-300 ${
                  errors.cvFile ? "border-red-400 ring-red-400/20" : ""
                }`}
              />
              <p className="text-sm text-gray-400 mt-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Accepted formats: PDF (.pdf), Word documents (.docx), and text
                files (.txt)
              </p>
            </div>

            {errors.cvFile && (
              <p className="text-sm text-red-400 flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                {errors.cvFile}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Analyzing with AI...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span>Analyze Candidate Fit</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
