import { Router } from 'express';

import SubtitleController from '../../modules/SubtitleModule/SubtitleController';
import Upload from '../../middleware/UploadMiddleware';

const router = Router();

router.post('/upload-subtitles', Upload.single('file'), SubtitleController.uploadSubtitle);

export default router;
