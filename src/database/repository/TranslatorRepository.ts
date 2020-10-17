import { Repository, EntityRepository } from 'typeorm';
import Translation from '../entity/Translation';

@EntityRepository(Translation)
export default class TranslatorRepository extends Repository<Translation> {
  /**
   * Search using Fuzzy matching with levenshtein and and PostgreSQL
   * [https://towardsdatascience.com/fuzzy-matching-with-levenshtein-and-postgresql-ed66cad01c03]
   */
  async fuzzyStrMatch(searchStr: string, source: string, target: string): Promise<Translation> {
    const trnslator = await this.createQueryBuilder('translations')
      .where(
        '(levenshtein(:searchStr, name) < 5) and source_language = :source and targe_language = :target',
        { searchStr, source, target }
      )
      .getOne();

    if (!trnslator) throw new Error('No Match');

    return trnslator;
  }
}
