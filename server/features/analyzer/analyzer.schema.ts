import { z } from 'zod';

export const AnalysisResponseSchema = z.object({
  summary: z.string().describe("A 3-sentence high-level overview of the contract."),
  risks: z.array(z.object({
    severity: z.enum(['high', 'medium', 'low']),
    clause: z.string().describe("The specific text or title of the clause from the document."),
    explanation: z.string().describe("Why this is a risk for the user."),
    actionItem: z.string().describe("What the user should ask for or change.")
  })),
  keyDates: z.array(z.object({
    event: z.string().describe("e.g., Termination Notice, Expiration"),
    date: z.string()
  })),
  overallRiskScore: z.number().min(0).max(100)
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;