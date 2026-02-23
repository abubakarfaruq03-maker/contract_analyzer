import Groq from "groq-sdk";
import pdf from "pdf-parse";
import { z } from "zod";
import { AnalysisResponseSchema } from "./analyzer.schema";
import { splitText } from "../../utils/text_splitter";
import env from "dotenv";

env.config();

export const analyzeDocument = async (fileBuffer: Buffer): Promise<z.infer<typeof AnalysisResponseSchema>> => {
  const groq = new (Groq as any)({ apiKey: process.env.OPEN_AI_KEY });

  try {
    console.log("Step 1: Parsing PDF...");
    const pdfData = await pdf(fileBuffer);
    const rawText = pdfData?.text;
    if (!rawText) throw new Error("PDF text is empty.");
    console.log("✅ PDF Parsed successfully.");

    const chunks = splitText(rawText, 3500, 300);
    const chunkAnalyses: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing chunk ${i + 1}/${chunks.length}...`);
      const res = await groq.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: "Analyze this contract part. Identify risks (severity, clause, explanation, actionItem) and keyDates (event, date). Return JSON." 
          },
          { role: "user", content: chunks[i] }
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
      });
      chunkAnalyses.push(res.choices[0]?.message?.content || "");
      await new Promise(resolve => setTimeout(resolve, 3000)); 
    }

    console.log("Step 4: Synthesizing to match Zod Schema...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    const synthesisPrompt = `
      Combine these contract analyses into one final JSON object.
      
      STRICT JSON STRUCTURE REQUIRED:
      {
        "summary": "3-sentence overview",
        "overallRiskScore": number (0-100),
        "risks": [
          { "severity": "high" | "medium" | "low", "clause": "exact text", "explanation": "why", "actionItem": "what to do" }
        ],
        "keyDates": [
          { "event": "string", "date": "string" }
        ]
      }
      
      DATA: ${chunkAnalyses.filter(Boolean).join("\n---\n")}
    `;

    const finalCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a legal API. You MUST return valid JSON using the exact keys: summary, risks, keyDates, overallRiskScore." },
        { role: "user", content: synthesisPrompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const finalContent = finalCompletion.choices[0]?.message?.content;
    console.log("Step 5: Validating against Zod...");

    const rawParsed = JSON.parse(finalContent || "{}");

    // DATA CLEANER: Maps AI output to match your specific Zod fields
    const cleanedData = {
      summary: String(rawParsed.summary || "Analysis completed."),
      overallRiskScore: Number(rawParsed.overallRiskScore) || 50,
      risks: (rawParsed.risks || []).map((r: any) => ({
        severity: (r.severity || 'medium'),
        clause: String(r.clause || "Relevant Clause"),
        explanation: String(r.explanation || "Risk identified in contract language."),
        actionItem: String(r.actionItem || "Consult legal counsel for further review.")
      })),
      keyDates: (rawParsed.keyDates || []).map((d: any) => ({
        event: String(d.event || "Contract Event"),
        date: String(d.date || "TBD")
      }))
    };

    return AnalysisResponseSchema.parse(cleanedData);

  } catch (error: any) {
    console.error("SERVICE CRASH:", error.message);
    throw error;
  }
};