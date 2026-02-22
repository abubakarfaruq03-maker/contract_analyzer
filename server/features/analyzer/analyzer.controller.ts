import { Request, Response } from 'express';
import { analyzeDocument } from './analyzer.service';

export const handleAnalysis = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file provided." });
    }

    const results = await analyzeDocument(req.file.buffer);
    
    // In a real PWA, you might also save this to a DB here
    res.json(results);
    
  } catch (error: any) {
    console.error("Grok Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze document with Grok AI." });
  }
};