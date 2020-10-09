import { getConnection } from 'typeorm';
import TranslatorRepository from './TranslatorRepository';

const connection = getConnection();

export function getTranslatorRepository(): TranslatorRepository {
  return connection.getCustomRepository(TranslatorRepository);
}
