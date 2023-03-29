import * as Joi from 'joi';

export const configurationsSchemaValidation = Joi.object({
  server: {
    port: Joi.string().required(),
  },
});
