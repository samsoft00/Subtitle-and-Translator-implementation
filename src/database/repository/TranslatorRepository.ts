import { Repository, EntityRepository } from 'typeorm';
import Translation from '../entity/Translation';

@EntityRepository(Translation)
export default class TranslatorRepository extends Repository<Translation> {}
