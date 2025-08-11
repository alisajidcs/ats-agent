"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        /^(text\/plain|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/
      )
    ) {
      newErrors.cvFile =
        "Please upload a Word document (.docx) or text file (.txt)";
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Talent Acquisition Agent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setErrors((prev) => ({ ...prev, jobDescription: undefined }));
              }}
              className={`min-h-[120px] ${
                errors.jobDescription ? "border-red-500" : ""
              }`}
            />
            {errors.jobDescription && (
              <p className="text-sm text-red-500">{errors.jobDescription}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvFile">Candidate CV</Label>
            <Input
              id="cvFile"
              type="file"
              accept=".docx,.txt"
              onChange={handleFileChange}
              className={`${errors.cvFile ? "border-red-500" : ""}`}
            />
            <p className="text-sm text-gray-500">
              Accepted formats: Word documents (.docx) and text files (.txt)
            </p>
            {errors.cvFile && (
              <p className="text-sm text-red-500">{errors.cvFile}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Fit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
