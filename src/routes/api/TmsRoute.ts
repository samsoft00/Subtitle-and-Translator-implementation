import { Router } from 'express';
import TmsController from '../../modules/TmsModule/TmsModuleController';

const router = Router();

router.post('/tms-translate', TmsController.translateData);
router.post('/tms-intro', TmsController.introduceData);

export default router;
