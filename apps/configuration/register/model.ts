import { registerAs } from "@nestjs/config"

export const ModelConfig = registerAs("model", () => ({
  lov: process.env.SOURCE_LOV,
}))
