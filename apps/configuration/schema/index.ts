import * as Joi from "joi"
import { CouchbaseSchema } from "./couchbase"
import { KafkaRedeemSchema } from "./kafka.redeem"

export const ConfigSchema = Joi.object()
  .concat(CouchbaseSchema)
  .concat(KafkaRedeemSchema)
