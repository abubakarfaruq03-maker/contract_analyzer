import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      // Multer properties
      file?: Express.Multer.File;
      files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
      
      // Your custom Auth property
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}