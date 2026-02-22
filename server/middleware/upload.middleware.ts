import multer from 'multer';

// 1. Setup Memory Storage
const storage = multer.memoryStorage();

// 2. Define File Filter (Security)
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDFs are allowed.'), false);
  }
};

// 3. Export the middleware with limits
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});