import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import analyzerRoutes from './features/analyzer/analyzer.route';
import authRoutes from './routes/auth'
import { errorHandler } from './middleware/error.middleware';

const app = express();

// 1.  Middlewares
app.use(helmet()); 
app.use(cors());   
app.use(express.json({ limit: '10mb' })); 

// 2. Feature Routes
app.use('/api/auth', authRoutes);         
app.use('/api/analyzer', analyzerRoutes); 


app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use(errorHandler);

export default app;