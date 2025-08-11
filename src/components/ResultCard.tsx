"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface AnalysisResult {
  fit: "Yes" | "No";
  reason: string;
}

interface ResultCardProps {
  result: AnalysisResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const isGoodFit = result.fit === "Yes";

  return (
    <Card
      className={`w-full max-w-2xl mx-auto ${
        isGoodFit ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
      }`}
    >
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2">
          {isGoodFit ? (
            <CheckCircle className="h-8 w-8 text-green-600" />
          ) : (
            <XCircle className="h-8 w-8 text-red-600" />
          )}
          <CardTitle
            className={`text-2xl font-bold ${
              isGoodFit ? "text-green-800" : "text-red-800"
            }`}
          >
            {isGoodFit ? "Good Fit!" : "Not a Good Fit"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                isGoodFit
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              AI Decision: {result.fit}
            </span>
          </div>

          <div className="space-y-2">
            <h3
              className={`font-semibold ${
                isGoodFit ? "text-green-800" : "text-red-800"
              }`}
            >
              Analysis:
            </h3>
            <p
              className={`text-gray-700 leading-relaxed ${
                isGoodFit ? "text-green-700" : "text-red-700"
              }`}
            >
              {result.reason}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
