import * as Joi from "joi"

export const CoreSchema = Joi.object({
  CORE_URL: Joi.string().required(),
  CORE_CLIENT_ID: Joi.string().required(),
  CORE_CLIENT_SECRET: Joi.string().required(),
  CORE_MERCHANT_ID: Joi.string().required(),
})
