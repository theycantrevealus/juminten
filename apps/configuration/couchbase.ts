import * as Joi from "joi"
import { registerAs } from "@nestjs/config"

export const CouchbaseSchema = Joi.object({
  COUCHBASE_CONNECTION_STRING: Joi.string().required(),
  COUCHBASE_BUCKET: Joi.string().required(),
  COUCHBASE_SCOPE: Joi.string().required(),
  COUCHBASE_USERNAME: Joi.string().required(),
  COUCHBASE_PASSWORD: Joi.string().required(),
})

export const CouchbaseConfig = registerAs("couchbase", () => ({
  connectionString: process.env.COUCHBASE_CONNECTION_STRING,
  bucket: process.env.COUCHBASE_BUCKET,
  scope: process.env.COUCHBASE_SCOPE,
  username: process.env.COUCHBASE_USERNAME,
  password: process.env.COUCHBASE_PASSWORD,
}))
