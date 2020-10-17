import Fuse from 'fuse.js';
import Translation from '../../database/entity/Translation';
import { getTranslatorRepository } from '../../database/repository';

export default class TmsTranslator {
  private source: string;
  private target: string;
  private langs: any;

  constructor(source = 'auto', target: string) {
    this.source = source;
    this.target = target;
    this.langs = {
      auto: 'Automatic',
      lv: 'Latvian',
      lt: 'Lithuanian',
      lb: 'Luxembourgish',
      mk: 'Macedonian',
      mg: 'Malagasy',
      ms: 'Malay',
      mt: 'Maltese',
      mi: 'Maori',
      mr: 'Marathi',
      en: 'English',
      de: 'German',
    };
  }

  async translate(searchQry: string): Promise<string> {
    const opts = { from: this.source || 'en', to: this.target };

    [opts.from, opts.to].forEach((lang) => {
      if (lang && !this.isSupported(lang)) throw new Error(`The language ${lang} is not supported`);
    });

    try {
      const trnslRepo = getTranslatorRepository();
      const translations = await trnslRepo.fuzzyStrMatch(searchQry, opts.from, opts.to);

      return translations.target;
    } catch (error) {
      return searchQry;
    }

    // const translations = await trnslRepo.find({
    //   where: { sourceLanguage: opts.from, targetLanguage: opts.to },
    // });

    // const options: Fuse.IFuseOptions<any> = {
    //   shouldSort: true,
    //   threshold: 0.0,
    //   keys: [{ name: 'source', weight: 0.1 }],
    // };

    /**
     * search for strings that are **approximately** equal in the database —
     * They might not be the same but close enough to be consider a translation.
     */
    // const fuse = new Fuse(translations, options);

    // const response: Array<Fuse.FuseResult<Translation>> = fuse.search(searchQry);
    // if (!response.length && !response[0]) return searchQry;

    /**
     * It calculates the distance between the query and the closest string found. —
     * A standard way of calculating strings distance is by using
     * Levenshtein distance algorithm
     */
    // const { source, target } = response[0].item;
    // const distance: number = this.levenshteinDistance(searchQry, source);

    /**
     * If the distance is less than 5, is considered a translation,
     * otherwise the same query is returned as result
     */

    // if (distance < 5) return target;
    // return searchQry;
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
