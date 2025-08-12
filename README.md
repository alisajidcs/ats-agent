# AI Talent Acquisition Agent

A Next.js 14 application that uses AI to analyze candidate CVs against job descriptions to determine fit.

## Features

- **File Upload**: Accepts PDF (.pdf), Word (.docx), and text (.txt) files
- **AI Analysis**: Uses Groq's LLM API to analyze candidate fit
- **Clean UI**: Built with shadcn/ui components and Tailwind CSS
- **Real-time Results**: Instant analysis with visual feedback
- **Full PDF Support**: Extract text content directly from PDF files

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **File Processing**: pdf-parse, mammoth
- **AI**: Groq LLM API (openai/gpt-oss-20b)
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+
- npm or yarn
- Groq API key (free tier available)

## Setup

1. **Clone and install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` and add your Groq API key:

   ```
   GROQ_API_KEY=your_actual_api_key_here
   ```

3. **Get a Groq API key**:

   - Visit [Groq Console](https://console.groq.com/)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env.local` file

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. **Enter Job Description**: Paste or type the job description in the text area
2. **Upload CV**: Select a PDF or Word document (.pdf or .docx)
3. **Submit**: Click "Analyze Fit" to process the documents
4. **View Results**: The AI will analyze the fit and display:
   - **Fit Decision**: Yes/No with visual indicators
   - **Detailed Analysis**: Explanation of the decision

## API Endpoints

- `POST /api/analyze`: Processes job description and CV file
  - Accepts: `multipart/form-data` with `jobDescription` and `cvFile`
  - Returns: JSON with `fit` (Yes/No) and `reason`

## File Support

- **PDF**: Uses `pdf-parse` library for .pdf files - extracts text content directly
- **Word Documents**: Uses `mammoth` library for .docx files
- **Text Files**: Direct UTF-8 text reading for .txt files

### PDF Processing Features

- **Direct Text Extraction**: Automatically extracts readable text from PDF files
- **Multi-page Support**: Processes all pages in multi-page PDFs
- **Content Validation**: Ensures extracted text is meaningful and not empty
- **Error Handling**: Graceful fallback for corrupted or unreadable PDFs

## Error Handling

- Form validation for required fields
- File type validation
- API error handling with user-friendly messages
- Toast notifications for success/error states

## Development

- **Components**: Modular React components in `src/components/`
- **API Routes**: Next.js API routes in `src/app/api/`
- **Styling**: Tailwind CSS with shadcn/ui component library

## Deployment

The application can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

Make sure to set the `GROQ_API_KEY` environment variable in your deployment platform.

## License

MIT
