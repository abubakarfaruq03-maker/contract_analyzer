import { Router } from 'express';
import { upload } from '../../middleware/upload.middleware';
import { handleAnalysis } from './analyzer.controller';

const router = Router();

// Endpoint: POST /api/analyze
router.post('/analyze', upload.single('contract'), handleAnalysis);

export default router;