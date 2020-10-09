import { Router } from 'express';

import SubtitleRoute from './SubtitleRoute';
import TmsRoute from './TmsRoute';

const routes = Router();

routes.use('/', SubtitleRoute);
routes.use('/', TmsRoute);

export default routes;
