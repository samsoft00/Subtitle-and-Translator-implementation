import { getTranslatorRepository, getLangRepo } from '../../database/repository';
import CustomError from '../../Utils/CustomError';

export default class TmsTranslator {
  private source: string;
  private target: string;
  private langs: { [key: string]: string };

  constructor(source = 'auto', target: string) {
    this.source = source;
    this.target = target;
  }

  async translate(searchQry: string): Promise<string> {
    const opts = { from: this.source || 'en', to: this.target };
    this.langs = await getLangRepo().fetchLangs();

    [opts.from, opts.to].forEach((lang) => {
      if (lang && !this.isSupported(lang))
        throw new CustomError(404, `The language ${lang} is not supported`);
    });

    try {
      const trnslRepo = getTranslatorRepository();
      const translations = await trnslRepo.fuzzyStrMatch(searchQry, opts.from, opts.to);

      return translations.target;
    } catch (error) {
      if (error instanceof CustomError) throw new Error(error.message);
      return Promise.resolve(searchQry);
    }
  }

  /**
   * Check if lang is supported
   * @param desiredLang {string}
   */
  private isSupported(desiredLang: string): boolean {
    if (!desiredLang) return false;

    desiredLang = desiredLang.toLowerCase();

    if (this.langs[desiredLang]) return true;

    const keys = Object.keys(this.langs).filter((key) => {
      if (typeof this.langs[key] !== 'string') {
        return false;
      }

      return this.langs[key].toLowerCase() === desiredLang;
    });

    return keys[0] ? true : false;
  }
}
