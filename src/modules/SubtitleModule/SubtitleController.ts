import { Request, Response, NextFunction } from 'express';
import intoStream from 'into-stream';
import { createInterface } from 'readline';
import RespUtil from '../../Utils/RespUtil';
import SubtitleService from './SubtitleService';
import { EventType, LengooEmitter } from '../../Utils/Emittery';

const util = new RespUtil();

export default class SubtitleController {
  static async uploadSubtitle(req: Request, res: Response, _next: NextFunction) {
    try {
      const { email, target, source } = req.body;
      const { file } = req;

      // read file to stream
      const getBufferToText = (): Promise<string[][]> =>
        new Promise((resolve) => {
          const rd = createInterface({
            input: intoStream(file.buffer),
            crlfDelay: Infinity,
          });

          const lines: string[][] = [];

          // @TODO: refactor, use regex instead
          rd.on('line', (line: string) => {
            lines.push([
              line.split(' ')[0].trim(),
              line.substring(line.indexOf('['), line.indexOf(']') + 1).trim(),
              line.substring(line.indexOf(']') + 1, line.length).trim(),
            ]);
          });

          rd.on('close', (line: any) => resolve(lines));
        });

      const payload: string[][] = await getBufferToText();

      const opts = {
        receiver_email: email,
        filename: file.originalname,
        target,
        source: source || 'en',
      };

      const service = new SubtitleService(opts);
      const response: string[] = await service.process(payload);

      let data = '';
      response.map((resp) => (data += resp + '\n'));

      // send mail using event
      LengooEmitter.emit({
        payload: { data, opts },
        type: EventType.SendEmail,
      });

      util.setSuccess(200, 'Upload successful, we will notify you once subtitle is done', opts);
      return util.send(res);
    } catch ({ statusCode, message }) {
      return util.setError(statusCode || 400, message).send(res);
    }
  }
}
