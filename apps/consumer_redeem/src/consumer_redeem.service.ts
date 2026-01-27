import { KafkaService } from "@module/kafka/service"
import { Inject, Injectable } from "@nestjs/common"
import { CompressionTypes } from "kafkajs"

@Injectable()
export class ConsumerRedeemService {
  constructor(
    @Inject("ELIGIBILITY_SERVICE")
    private readonly clientEligibility: KafkaService,
  ) {}

  getHello(): string {
    return "Hello World!"
  }

  async processEligi(payload: any) {
    await this.clientEligibility.send({
      acks: -1,
      timeout: 5000,
      topic: "eligibility",
      compression: CompressionTypes.None,
      messages: [
        {
          headers: {
            version: "1.0.1",
            token: "eyaxas.ascascasasx.acascascasc",
          },
          value: payload,
          key: "TRX_xxxxxxxxx",
        },
      ],
    })
  }

  async processEligiTransaction(payload: any) {
    const transaction = await this.clientEligibility.transaction(
      "eligibility_transaction",
    )

    console.log(payload)

    await transaction.send({
      acks: -1,
      timeout: 5000,
      topic: "eligibility",
      compression: CompressionTypes.None,
      messages: [
        {
          headers: {
            version: "1.0.1",
            token: "eyaxas.ascascasasx.acascascasc",
          },
          value: payload,
          key: "TRX_xxxxxxxxx",
        },
      ],
    })
  }
}
