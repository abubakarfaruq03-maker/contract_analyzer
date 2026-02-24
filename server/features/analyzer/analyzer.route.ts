import { Router } from 'express';
// 1. Remove the .js extensions
import { handleAnalysis, saveAnalysis } from './analyzer.controller'; 
import { upload } from '../../middleware/upload.middleware';
// 2. Import 'protect' instead of 'authenticateToken'
import { protect } from '../../middleware/auth.middleware'; 

const router = Router();

// 3. Use 'protect' here
router.post('/analyze', protect, upload.single('contract'), handleAnalysis);
router.post('/save', protect, saveAnalysis);

export default router;