import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // 1. Grab the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // 2. Verify the token using your Secret Key
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is missing from .env");
      return res.status(500).json({ error: "Internal server configuration error." });
    }

    const decoded = jwt.verify(token, secret) as { userId: string; email: string };

    // 3. Attach the decoded user data to the request object
    (req as AuthRequest).user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};