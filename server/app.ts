import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import analyzerRoutes from './features/analyzer/analyzer.route';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// 1. Essential Middlewares
app.use(helmet()); // Secures headers
app.use(cors());   // Allows PWA to talk to this backend
app.use(express.json({ limit: '10mb' })); // Handles JSON bodies

// 2. Feature Routes
app.use('/api/analyzer', analyzerRoutes);

// 3. 404 Handler (for routes that don't exist)
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// 4. Global Error Handler (Must be last!)
app.use(errorHandler);

export default app;