import { NestFactory } from "@nestjs/core"
import { ConsumerRedeemModule } from "./consumer_redeem.module"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { DecoratorProcessorService, SubscribeTo } from "@module/kafka/decorator"
import { KAFKA_TOPICS } from "@util/constant"
import { ConsumerRedeemController } from "./consumer_redeem.controller"

async function bootstrap() {
  const app = await NestFactory.create(ConsumerRedeemModule)

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        port: 4001,
      },
    },
    { inheritAppConfig: true },
  )

  app.get(DecoratorProcessorService).processDecorators([
    {
      target: ConsumerRedeemController,
      constant: KAFKA_TOPICS,
      meta: `kafka`,
      decorator: SubscribeTo,
    },
  ])

  await app.startAllMicroservices()
  await app.listen(4000)
}
bootstrap()
