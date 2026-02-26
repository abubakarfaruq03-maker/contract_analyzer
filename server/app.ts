import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import analyzerRoutes from './features/analyzer/analyzer.route.js';
import authRoutes from './routes/auth.js'
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// 1.  Middlewares
app.use(cors({
  // Replace with your actual Vercel URL after deployment
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://contract-analyzer-beta-sooty.vercel.app' 
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));app.use(express.json({ limit: '10mb' })); 
app.use(helmet()); 


// 2. Feature Routes
app.use('/api/auth', authRoutes);         
app.use('/api/analyzer', analyzerRoutes); 


app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use(errorHandler);

export default app;