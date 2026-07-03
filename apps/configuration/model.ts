import * as Joi from "joi"
import { registerAs } from "@nestjs/config"

export const ModelSchema = Joi.object({
  SOURCE_LOV: Joi.string().required(),
  SOURCE_ACCOUNT: Joi.string().required(),
})

export const ModelConfig = registerAs("model", () => ({
  lov: process.env.SOURCE_LOV,
}))
