import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// import multer from 'multer';
const imageStorage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
    callback(null, 'imageStore/');
  },
  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    callback(null, file.originalname);
  },
});

const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  const mimeImage = file.mimetype.split('/')[0];
  if (mimeImage === 'image') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// export const uploadImage = multer({ dest: 'uploadsImg/' });
export const uploadImage = multer({ storage: imageStorage, fileFilter: fileFilter });
