import { registerAs } from "@nestjs/config"

export const CoreConfig = registerAs("core", () => ({
  url: process.env.CORE_URL,
  clientId: process.env.CORE_CLIENT_ID,
  clientSecret: process.env.CORE_CLIENT_SECRET,
  merchantId: process.env.CORE_MERCHANT_ID,
}))
