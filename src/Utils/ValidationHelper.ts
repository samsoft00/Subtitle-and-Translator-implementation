import Joi from '@hapi/joi';

/**
 * Joi helper class for validation
 * @developer Oyewole Abayomi Samuel
 */
export default class ValidationHelper {
  static validateTranslationReq() {
    return Joi.object().keys({
      source: Joi.string().max(2).error(new Error('Source must be 2 characters long')),
      target: Joi.string().max(2).required().error(new Error('Target is required')),
      query: Joi.string().required().error(new Error('Translation query is required')),
    });
  }
  static validateIntroReq() {
    const introObj = Joi.object().keys({
      source: Joi.string().required().error(new Error('Source text is required')),
      target: Joi.string().required().error(new Error('Target text is required')),
      source_language: Joi.string().max(2).error(new Error('Source must be 2 characters long')),
      target_language: Joi.string().max(2).required().error(new Error('Target is required')),
    });

    return Joi.array().items(introObj);
  }
}
