import config from 'config';
import multer, { memoryStorage } from 'multer';

import CustomError from '../Utils/CustomError';

const allowedFileExt = ['text/plain'];
const MAX_UPLOAD_FILE_SIZE: number = config.get('general.maxUploadFileSize');

export default multer({
  storage: memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (allowedFileExt.indexOf(file.mimetype) <= -1) {
      return cb(new CustomError(400, 'Invalid file type, check API doc for approved extensions'));
    }
    cb(null, true);
  },
});
