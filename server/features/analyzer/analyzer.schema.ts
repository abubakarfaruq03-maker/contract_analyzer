import { z } from 'zod';

export const AnalysisResponseSchema = z.object({
  summary: z.string(),
  risks: z.array(z.object({
    // Allow the AI to be a bit messy with casing
    severity: z.enum(['high', 'medium', 'low', 'High', 'Medium', 'Low']).transform(val => val.toLowerCase()),
    clause: z.string(),
    explanation: z.string(),
    actionItem: z.string()
  })).default([]), // If no risks found, return empty array instead of failing
  keyDates: z.array(z.object({
    event: z.string(),
    date: z.string()
  })).default([]), // If no dates found, return empty array instead of failing
  overallRiskScore: z.number().min(0).max(100)
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;