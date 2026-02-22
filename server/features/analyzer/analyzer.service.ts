import Groq from "groq-sdk";
import * as pdf from "pdf-parse";
import { z } from "zod";
import { AnalysisResponseSchema } from "./analyzer.schema";
import { splitText } from "../../utils/text_splitter";
import env from "dotenv";

env.config();

type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;

const groq = new Groq({
  apiKey: process.env.OPEN_AI_KEY as string,
});

/**
 * Analyzes a contract using a Map-Reduce approach to handle documents of any length.
 */
export const analyzeDocument = async (fileBuffer: Buffer): Promise<AnalysisResponse> => {
  try {
    // 1. EXTRACT: Convert PDF Buffer to Text
    const pdfData = await (pdf as any)(fileBuffer);
    const rawText = pdfData.text;

    if (!rawText || rawText.trim().length === 0) {
      throw new Error("The PDF appears to be empty or unreadable.");
    }

    // 2. MAP: Split text into chunks and analyze each
    // We use smaller chunks (6000 chars) for faster, more focused "local" analysis
    const chunks = splitText(rawText, 6000, 600);
    
    console.log(`Processing ${chunks.length} chunks...`);

    const chunkAnalyses = await Promise.all(
      chunks.map(async (chunk, index) => {
        const response = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a legal assistant. Extract key risks and dates from this contract segment. Return JSON."
            },
            { role: "user", content: `Segment ${index + 1}: ${chunk}` }
          ],
          model: "llama-3.3-70b-versatile",
          response_format: { type: "json_object" },
          temperature: 0,
        });
        return response.choices[0]?.message?.content || "";
      })
    );

    // 3. REDUCE: Synthesize all partial analyses into one master report
    // This step removes duplicates and creates a cohesive executive summary.
    const synthesisPrompt = `
      You are a Senior Legal Auditor. I have analyzed a contract in parts. 
      Combine these partial insights into one final, structured report.
      Remove redundant risks and ensure the summary covers the entire document.
      
      Partial Analyses:
      ${chunkAnalyses.join("\n---\n")}
    `;

    const finalCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Synthesize the provided legal data into a single, high-quality JSON report."
        },
        { role: "user", content: synthesisPrompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const finalContent = finalCompletion.choices[0]?.message?.content;
    if (!finalContent) throw new Error("Synthesis failed.");

    // 4. VALIDATE: Ensure the final output matches our Zod Schema
    return AnalysisResponseSchema.parse(JSON.parse(finalContent));

  } catch (error) {
    console.error("Analysis Service Error:", error);
    if (error instanceof z.ZodError) {
      throw new Error("AI output validation failed. Please try again.");
    }
    throw error;
  }
};