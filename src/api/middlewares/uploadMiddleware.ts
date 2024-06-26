import multer from 'multer';
import config from '../../config';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.userPhotosDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_`;
    cb(null, uniqueSuffix + '_' + file.originalname);
  },
});

export const uploadMiddleware = multer({ storage: storage });
