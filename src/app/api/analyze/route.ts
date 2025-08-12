import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import pdfParse from "pdf-parse/lib/pdf-parse";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jobDescription = formData.get("jobDescription") as string;
    const cvFile = formData.get("cvFile") as File;

    if (!jobDescription || !cvFile) {
      return NextResponse.json(
        { error: "Job description and CV file are required" },
        { status: 400 }
      );
    }

    // Extract text from CV file
    let cvText = "";
    const fileBuffer = Buffer.from(await cvFile.arrayBuffer());

    if (cvFile.type === "text/plain") {
      // Handle plain text files
      cvText = fileBuffer.toString("utf-8");
    } else if (cvFile.type === "application/pdf") {
      // Handle PDF files - ACTUALLY extract text content
      try {
        const pdfData = await pdfParse(fileBuffer);
        cvText = pdfData.text;

        // Validate that we actually got text content
        if (!cvText || !cvText.trim()) {
          return NextResponse.json(
            {
              error:
                "The PDF appears to be empty or contains no extractable text. Please ensure the PDF contains readable text content.",
            },
            { status: 400 }
          );
        }

        console.log(
          `Successfully extracted ${cvText.length} characters from PDF`
        );
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        return NextResponse.json(
          {
            error:
              "Failed to parse PDF file. Please ensure the PDF contains extractable text and is not corrupted or password-protected.",
          },
          { status: 400 }
        );
      }
    } else if (
      cvFile.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Dynamic import to avoid build issues
      const mammoth = (await import("mammoth")).default;
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      cvText = result.value;
    } else {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload a PDF (.pdf), Word document (.docx), or text file (.txt).",
        },
        { status: 400 }
      );
    }

    // Prepare prompt for Groq
    const prompt = `You are a recruitment assistant. Compare the following Job Description and CV text.
Return a JSON with fields:
- fit: "Yes" or "No"
- reason: Detailed reason for your decision.

Job Description:
${jobDescription}

CV:
${cvText}`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.1,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response from Groq API");
    }

    // Try to parse JSON from response
    let result;
    try {
      // Extract JSON from the response (in case the model returns additional text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      console.error("Failed to parse JSON from Groq response:", response);
      throw new Error("Invalid response format from AI model");
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
