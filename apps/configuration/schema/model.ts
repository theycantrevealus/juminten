import * as Joi from "joi"

export const ModelSchema = Joi.object({
  SOURCE_LOV: Joi.string().required(),
  SOURCE_ACCOUNT: Joi.string().required(),
})
