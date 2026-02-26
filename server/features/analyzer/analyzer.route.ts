import { Router } from 'express';
import { handleAnalysis, saveAnalysis } from './analyzer.controller.js'; 
import { upload } from '../../middleware/upload.middleware.js';
import { protect } from '../../middleware/auth.middleware.js'; 

const router = Router();

router.post('/analyze', protect, upload.single('contract'), handleAnalysis);
router.post('/save', protect, saveAnalysis);

export default router;