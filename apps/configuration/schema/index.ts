import * as Joi from "joi"
import { CouchbaseSchema } from "./couchbase"
import { KafkaRedeemSchema } from "./kafka.redeem"
import { CoreSchema } from "./core"
import { ModelSchema } from "./model"

export const ConfigSchema = Joi.object()
  .concat(ModelSchema)
  .concat(CouchbaseSchema)
  .concat(CoreSchema)
  .concat(KafkaRedeemSchema)
