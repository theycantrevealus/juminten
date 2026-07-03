import * as Joi from "joi"
import { registerAs } from "@nestjs/config"

export const CoreSchema = Joi.object({
  CORE_URL: Joi.string().required(),
  CORE_CLIENT_ID: Joi.string().required(),
  CORE_CLIENT_SECRET: Joi.string().required(),
  CORE_MERCHANT_ID: Joi.string().required(),
})

export const CoreConfig = registerAs("core", () => ({
  url: process.env.CORE_URL,
  clientId: process.env.CORE_CLIENT_ID,
  clientSecret: process.env.CORE_CLIENT_SECRET,
  merchantId: process.env.CORE_MERCHANT_ID,
}))
