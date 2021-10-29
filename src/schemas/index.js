import Joi from 'joi';

export const url = Joi.string().uri();

export const urlWithOptions = Joi.object({
  url: url.required(),
  private: Joi.boolean(),
});
