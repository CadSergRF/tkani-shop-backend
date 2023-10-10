import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, 'uploads')
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, 'uploadDB.csv')
  }
})

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === 'text/csv'
  ) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

export const uploadCSV = multer({ storage: fileStorage, fileFilter: fileFilter })