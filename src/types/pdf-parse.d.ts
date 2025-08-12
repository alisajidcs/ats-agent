declare module "pdf-parse/lib/pdf-parse" {
  function pdfParse(
    dataBuffer: Buffer,
    options?: {
      pagerender?: (pageData: unknown) => string | Promise<string>;
      max?: number;
      version?: string;
    }
  ): Promise<{
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    version: string;
  }>;
  export = pdfParse;
}
