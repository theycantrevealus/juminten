import { Module, OnApplicationShutdown } from "@nestjs/common"
import { ConsumerRedeemController } from "./consumer_redeem.controller"
import { ConsumerRedeemService } from "./consumer_redeem.service"
import { DecoratorProcessorService } from "@module/kafka/decorator"
import { KafkaModule } from "@module/kafka/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { KafkaModuleOption } from "@module/kafka/interface"
import { KafkaRedeemConfig } from "@configuration/register/kafka.redeem"
import { environmentIdentifier, environmentName } from "@shared/environment"
import { WinstonModule } from "@module/logger/module"
import { WinstonCustomTransports } from "@module/logger/transport"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${environmentIdentifier}/kafka.redeem.env`],
      load: [KafkaRedeemConfig],
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          handleRejections: true,
          handleExceptions: true,
          colorize:
            configService.get<boolean>("application.log.colorize") ?? true,
          transports: WinstonCustomTransports[environmentName],
        }
      },
      inject: [ConfigService],
    }),
    KafkaModule.registerAsync(["REDEEM_SERVICE"], {
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(
          `Service : ${configService.get<string>("kafka.redeem.service")}`,
        )
        return [
          {
            name: configService.get<string>("kafka.redeem.service"),
            options: {
              consumeFromBeginning: configService.get<boolean>(
                "kafka.redeem.consumeFromBeginning",
              ),
              producerModeOnly: configService.get<boolean>(
                "kafka.redeem.producerModeOnly",
              ),
              consumer: {
                groupId: configService.get<string>(
                  "kafka.redeem.consumer.groupId",
                ),
              },
              producer: {
                idempotent: configService.get<boolean>(
                  "kafka.redeem.producer.idempotent",
                ),
                maxInFlightRequests: configService.get<number>(
                  "kafka.redeem.producer.maxInFlightRequests",
                ),
              },
              client: {
                clientId: configService.get<string>(
                  "kafka.redeem.client.clientId",
                ),
                brokers: configService.get<string[]>(
                  "kafka.redeem.client.brokers",
                ),
              },
            },
          },
        ] as KafkaModuleOption[]
      },
    }),
  ],
  controllers: [ConsumerRedeemController],
  providers: [DecoratorProcessorService, ConsumerRedeemService],
  exports: [DecoratorProcessorService],
})
export class ConsumerRedeemModule implements OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    console.log("Application shutdown")
  }
}
