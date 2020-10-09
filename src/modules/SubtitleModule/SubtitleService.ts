import { map } from 'async';
import TmsTranslator from '../TmsModule/TmsTranslator';

export default class SubtitleService {
  translator: TmsTranslator;

  constructor(opts: { source: string; target: string }) {
    this.translator = new TmsTranslator(opts.source, opts.target);
  }

  async process(payload: string[][]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      map(payload, this._subtitle.bind(this), (err, result) => {
        if (err) return reject(err);
        return resolve(result as string[]);
      });
    });
  }

  async _subtitle(eachLine: string[], callback: any) {
    try {
      const response = await this.translator.translate(eachLine[eachLine.length - 1]);
      eachLine[eachLine.length - 1] = response;
      callback(null, eachLine.join(' '));
    } catch (error) {
      callback(error, null);
    }
  }
}
