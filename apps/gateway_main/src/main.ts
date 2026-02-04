import { NestFactory } from "@nestjs/core"
import { GatewayMainModule } from "./module"
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify"
import { ValidationPipe, VersioningType } from "@nestjs/common"
import { WinstonCustomTransports } from "@module/logger/transport"
import { environmentName } from "@shared/environment"
import { CommonErrorFilter } from "@filter/common"
import * as winston from "winston"

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: false,
    bodyLimit: 102457600,
    routerOptions: {
      ignoreTrailingSlash: true,
      ignoreDuplicateSlashes: true,
    },
  })

  const app = await NestFactory.create<NestFastifyApplication>(
    GatewayMainModule,
    fastifyAdapter,
    {
      bodyParser: false,
      logger: ["verbose", "error", "warn"],
    },
  )

  const logger = winston.createLogger({
    transports: WinstonCustomTransports[environmentName],
    levels: {
      error: 0,
      warn: 1,
      info: 2,
    },
  })

  app.useGlobalFilters(new CommonErrorFilter(logger))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.enableCors()
  await app.listen(process.env.NODE_PORT ?? 3000)
}
bootstrap()
