import {
  ConsumerConfig,
  ConsumerRunConfig,
  KafkaConfig,
  Message,
  ProducerConfig,
  ProducerRecord,
  RecordMetadata,
  Transaction,
} from "kafkajs"
import { Deserializer, Serializer } from "@nestjs/microservices"
import { ModuleMetadata, Type } from "@nestjs/common"

export interface KafkaModuleOption {
  name: string
  options: {
    client: KafkaConfig
    consumer: ConsumerConfig
    consumerRunConfig?: ConsumerRunConfig
    producer?: ProducerConfig
    deserializer?: Deserializer
    serializer?: Serializer
    consumeFromBeginning?: boolean
    seek?: Record<string, number | "earliest" | Date>
    autoConnect?: boolean
    producerModeOnly: boolean
    consumerMode?: "message" | "batch"
    partitionsConsumedConcurrently: number
  }
}

/**
 * @interface
 * For key, you could add contract to standard the data. Using schema registry would make the search faster
 */
export interface KafkaMessageObject extends Message {
  headers: any | Buffer | string | null
  value: any | Buffer | string | null
  key: any
}

export interface KafkaMessageSend extends Omit<ProducerRecord, "topic"> {
  messages: KafkaMessageObject[]
  topic?: string
}

export interface KafkaTransaction extends Omit<
  Transaction,
  "send" | "sendBatch"
> {
  send(message: KafkaMessageSend): Promise<RecordMetadata[]>
}

export interface KafkaOptionsFactory {
  creatKafkaModuleOptions(): Promise<KafkaModuleOption[]> | KafkaModuleOption[]
}

export interface KafkaModuleOptionsAsync extends Pick<
  ModuleMetadata,
  "imports"
> {
  inject?: any[]
  useExisting?: Type<KafkaOptionsFactory>
  useClass?: Type<KafkaOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<KafkaModuleOption[]> | KafkaModuleOption[]
}
