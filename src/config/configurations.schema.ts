import * as Joi from 'joi';

export const configurationsSchemaValidation = Joi.object({
  server: {
    port: Joi.string().required(),
  },
  database: {
    databaseURL: Joi.string().required(),
  },
  jwt: {
    secret: Joi.string().required(),
    expiresIn: Joi.number().required(),
    salt: Joi.string().required(),
  },
});
