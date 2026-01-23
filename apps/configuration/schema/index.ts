import * as Joi from "joi"
import { CouchbaseSchema } from "./couchbase"
import { KafkaRedeemSchema } from "./kafka.redeem"
import { CoreSchema } from "./core"

export const ConfigSchema = Joi.object()
  .concat(CouchbaseSchema)
  .concat(CoreSchema)
  .concat(KafkaRedeemSchema)
