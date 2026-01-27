import { Inject, Injectable } from "@nestjs/common"
import { SUBSCRIBER_MAP } from "./constant"
import { ConfigService } from "@nestjs/config"
import { WINSTON_MODULE_PROVIDER } from "@module/logger/constant"
import { Logger } from "winston"
import { KAFKA_TOPICS } from "@util/constant"

export function SubscribeTo(topic: string) {
  return (target, propertyKey, descriptor) => {
    const originalMethod = target[propertyKey]
    SUBSCRIBER_MAP.set(topic, originalMethod)
    return descriptor
  }
}

export function KafkaTopic(variable: string): any {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(KAFKA_TOPICS, variable, descriptor.value)
    return descriptor
  }
}

@Injectable()
export class DecoratorProcessorService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  processDecorators(types: any[]) {
    for (const type of types) {
      const propNames = Object.getOwnPropertyNames(type.target.prototype)
      for (const prop of propNames) {
        const propValue = Reflect.getMetadata(
          type.constant,
          Reflect.get(type.target.prototype, prop),
        )

        if (propValue) {
          const topic = this.configService.get<string>(
            `${type.meta}.${prop}.topic`,
          )
          this.logger.verbose(
            `Setting topic ${topic} for ${type.target.name}#${prop}`,
            "kafka",
          )

          Reflect.decorate(
            [type.decorator(topic)],
            type.target.prototype,
            prop,
            Reflect.getOwnPropertyDescriptor(type.target.prototype, prop),
          )
        }
      }
    }
  }
}
