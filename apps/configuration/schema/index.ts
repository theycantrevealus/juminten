import * as Joi from "joi"
import { CouchbaseSchema } from "./couchbase"

export const ConfigSchema = Joi.object().concat(CouchbaseSchema)
