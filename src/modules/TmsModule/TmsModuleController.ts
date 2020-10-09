import { pick } from 'lodash';
import { Request, Response, NextFunction } from 'express';

import { getTranslatorRepository } from '../../database/repository';
import ValidationHelper from '../../Utils/ValidationHelper';
import TmsTranslator from './TmsTranslator';
import RespUtil from '../../Utils/RespUtil';

const util = new RespUtil();

/**
 * Create the TMS either inside or outside the document
 * translator (however you feel is the best way) with
 * the two endpoints stated before.
 */
export default class TmsController {
  // one for translating data
  static async translateData(req: Request, res: Response, _next: NextFunction) {
    const { validateTranslationReq } = ValidationHelper;

    try {
      const payload = pick(req.body, ['source', 'target', 'query']);

      await validateTranslationReq().validateAsync(payload);
      if (!payload.source) {
        Object.assign(payload, { source: 'en' });
      }

      const { source, target, query } = payload;

      const translator = new TmsTranslator(source, target);
      const response = await translator.translate(query);

      util.setSuccess(200, 'successful', response);
      return util.send(res);
    } catch ({ statusCode, message }) {
      return util.setError(statusCode || 400, message).send(res);
    }
  }

  // and the other for introducing data
  static async introduceData(req: Request, res: Response, _next: NextFunction) {
    const { validateIntroReq } = ValidationHelper;

    try {
      const payload = req.body;
      await validateIntroReq().validateAsync(payload);

      const transRepo = getTranslatorRepository();
      const intros = transRepo.create(payload);

      await transRepo.save(intros);

      util.setSuccess(200, 'Data upload successful', {});
      return util.send(res);
    } catch ({ statusCode, message }) {
      return util.setError(statusCode || 400, message).send(res);
    }
  }
}
