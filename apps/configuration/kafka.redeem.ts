import * as Joi from "joi"
import { registerAs } from "@nestjs/config"

export const KafkaRedeemSchema = Joi.object({
  COUCHBASE_CONNECTION_STRING: Joi.string().required(),
  COUCHBASE_BUCKET: Joi.string().required(),
  COUCHBASE_USERNAME: Joi.string().required(),
  COUCHBASE_PASSWORD: Joi.string().required(),
})

export const KafkaRedeemConfig = registerAs("kafka.redeem", () => ({
  topic: process.env.KAFKA_REDEEM_TOPIC,
  service: process.env.KAFKA_REDEEM_SERVICE,
  consumeFromBeginning:
    process.env.KAFKA_REDEEM_CONSUME_FROM_BEGINNING?.toString() === "true",
  producerModeOnly:
    process.env.KAFKA_REDEEM_PRODUCER_MODE?.toString() === "true",
  consumer: {
    groupId: process.env.KAFKA_REDEEM_CONSUMER_GROUP_ID,
  },
  producer: {
    idempotent:
      process.env.KAFKA_REDEEM_PRODUCER_IDEMPOTENT?.toString() === "true",
    maxInFlightRequests:
      process.env.KAFKA_REDEEM_PRODUCER_MAX_IN_FLIGHT_REQUESTS,
  },
  client: {
    clientId: process.env.KAFKA_REDEEM_CLIENT_ID,
    brokers: process.env.KAFKA_REDEEM_CLIENT_BROKERS?.toString().split(","),
  },
}))
