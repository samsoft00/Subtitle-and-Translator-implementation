import { EntityRepository, Repository } from 'typeorm';
import Lang from '../entity/Lang';

@EntityRepository(Lang)
export default class LangRepository extends Repository<Lang> {
  //   async isLangSupport(desiredLang: string) {}

  async fetchLangs(): Promise<{ [key: string]: string }> {
    const langs = await this.find();

    const results = {};
    langs.map((lang) => {
      results[lang.key] = lang.value;
    });

    return results;
  }
}
