"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, TrendingUp, TrendingDown } from "lucide-react";

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
      className={`w-full max-w-3xl mx-auto backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden ${
        isGoodFit
          ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/30"
          : "bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-400/30"
      }`}
    >
      {/* Header with animated background */}
      <div
        className={`relative overflow-hidden ${
          isGoodFit
            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20"
            : "bg-gradient-to-r from-red-500/20 to-pink-500/20"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>

        <CardHeader className="text-center relative z-10 py-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div
              className={`p-4 rounded-2xl shadow-lg ${
                isGoodFit
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : "bg-gradient-to-r from-red-500 to-pink-500"
              }`}
            >
              {isGoodFit ? (
                <CheckCircle className="h-10 w-10 text-white" />
              ) : (
                <XCircle className="h-10 w-10 text-white" />
              )}
            </div>

            <div className="text-left">
              <CardTitle
                className={`text-4xl font-bold ${
                  isGoodFit ? "text-green-100" : "text-red-100"
                }`}
              >
                {isGoodFit ? "Excellent Match!" : "Not Recommended"}
              </CardTitle>
              <p
                className={`text-lg ${
                  isGoodFit ? "text-green-200" : "text-red-200"
                }`}
              >
                {isGoodFit
                  ? "This candidate shows strong potential"
                  : "Consider other candidates for this role"}
              </p>
            </div>
          </div>
        </CardHeader>
      </div>

      <CardContent className="p-8">
        <div className="space-y-6">
          {/* AI Decision Badge */}
          <div className="text-center">
            <div
              className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full text-lg font-semibold shadow-lg ${
                isGoodFit
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
              }`}
            >
              {isGoodFit ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span>AI Decision: {result.fit}</span>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg">
              <div
                className={`w-3 h-3 rounded-full ${
                  isGoodFit ? "bg-green-400" : "bg-red-400"
                } animate-pulse`}
              ></div>
              <span className="text-gray-300 text-sm">
                Confidence: {isGoodFit ? "High" : "High"}
              </span>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isGoodFit
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-red-500 to-pink-500"
                }`}
              >
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
              <h3
                className={`text-xl font-semibold ${
                  isGoodFit ? "text-green-100" : "text-red-100"
                }`}
              >
                AI Analysis Summary
              </h3>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isGoodFit
                  ? "bg-green-500/10 border border-green-400/20"
                  : "bg-red-500/10 border border-red-400/20"
              }`}
            >
              <p
                className={`text-lg leading-relaxed ${
                  isGoodFit ? "text-green-200" : "text-red-200"
                }`}
              >
                {result.reason}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                isGoodFit
                  ? "bg-green-500/20 text-green-200 border border-green-400/30 hover:bg-green-500/30 hover:border-green-400/50"
                  : "bg-red-500/20 text-red-200 border border-red-400/30 hover:bg-red-500/30 hover:border-red-400/50"
              }`}
            >
              View Detailed Report
            </button>
            <button className="px-6 py-3 rounded-lg font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Analyze Another CV
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
