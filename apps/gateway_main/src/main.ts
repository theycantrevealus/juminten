import { NestFactory } from "@nestjs/core"
import { GatewayMainModule } from "./module"
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify"

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: false,
    bodyLimit: 102457600,
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true,
  })

  const app = await NestFactory.create<NestFastifyApplication>(
    GatewayMainModule,
    fastifyAdapter,
    {
      bodyParser: false,
    },
  )

  app.enableCors()
  await app.listen(process.env.NODE_PORT ?? 3000)
}
bootstrap()
