import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common"
import { ConsumerRedeemService } from "./consumer_redeem.service"
import { KafkaService } from "@module/kafka/service"
import { KafkaTopic } from "@module/kafka/decorator"
import { Payload } from "@nestjs/microservices"
import { Consumer } from "kafkajs"

@Controller()
export class ConsumerRedeemController implements OnModuleInit {
  constructor(
    @Inject("REDEEM_SERVICE") private client: KafkaService,
    private readonly redeemService: ConsumerRedeemService,
  ) {}

  onModuleInit(): void {
    this.client.subscribeToResponseOf("redeem", this)
  }

  @KafkaTopic("KAFKA_TOPICS")
  async redeem(
    @Payload() payload: any,
    key: any,
    offset: string,
    timestamp: string,
    partition: number,
    topic: string,
    consumer: Consumer,
    headers: any,
  ) {
    console.log(`Topic     : ${JSON.stringify(topic, null, 2)}`)
    console.log(`Key       : ${JSON.stringify(key, null, 2)}`)
    console.log(`Offset    : ${offset}`)
    console.log(`Timestamp : ${timestamp}`)
    console.log(`Partition : ${partition}`)
    console.log(`Payload   : ${JSON.stringify(payload, null, 2)}`)
    console.log(`Header    : ${JSON.stringify(headers, null, 2)}`)

    // await this.redeemService.processEligi(payload)
    await this.redeemService.processEligi(payload)
  }
}
