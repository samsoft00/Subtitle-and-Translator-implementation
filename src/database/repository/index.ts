import { getConnection } from 'typeorm';
import LangRepository from './LangRepository';
import TranslatorRepository from './TranslatorRepository';

const connection = getConnection();

export function getTranslatorRepository(): TranslatorRepository {
  return connection.getCustomRepository(TranslatorRepository);
}

export function getLangRepo(): LangRepository {
  return connection.getCustomRepository(LangRepository);
}
