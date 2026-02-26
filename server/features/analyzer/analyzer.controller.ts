import { Request, Response } from 'express';
import { analyzeDocument } from './analyzer.service.js';
import { saveAnalysisToDb } from './analyzer.repository.js';


interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
  file?: Express.Multer.File;
}

/**
 * ROUTE: POST /api/analyzer/analyze
 * Purpose: Takes a NEW file, runs AI analysis, and saves to DB.
 */
export const handleAnalysis = async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;

  try {
    // 1. Validation: For this route, we MUST have a file
    if (!authReq.file) {
      return res.status(400).json({ error: "No PDF file provided for analysis." });
    }

    // 2. Process AI Analysis (The expensive part)
    const results = await analyzeDocument(authReq.file.buffer);
    
    // 3. Save to DB if user is logged in
    if (authReq.user) {
      try {
        await saveAnalysisToDb(
          authReq.user.userId, 
          authReq.file.originalname, 
          results
        );
      } catch (dbError) {
        console.error("Database Save Error during analysis:", dbError);
      }
    }    

    return res.json(results);
    
  } catch (error: any) {
    console.error("Grok Analysis Error:", error);
    return res.status(500).json({ error: "Failed to analyze document." });
  }
};

/**
 * ROUTE: POST /api/analyzer/save
 * Purpose: Takes existing JSON results (from useSync.ts) and saves to DB.
 */
export const saveAnalysis = async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;

  try {
    const { fileName, results } = authReq.body;

    // 1. Validation: Ensure user is authenticated via middleware
    if (!authReq.user) {
      return res.status(401).json({ error: "Authentication required for sync." });
    }

    // 2. Validation: Ensure we have the data to save
    if (!results || !fileName) {
      return res.status(400).json({ error: "Missing filename or analysis results." });
    }

    // 3. Save directly to Database
    const savedRecord = await saveAnalysisToDb(
      authReq.user.userId, 
      fileName, 
      results
    );

    return res.status(201).json({ 
      message: "Synced successfully", 
      id: savedRecord?.id 
    });

  } catch (error: any) {
    console.error("Sync Controller Error:", error);
    return res.status(500).json({ error: "Failed to sync analysis to cloud." });
  }
};