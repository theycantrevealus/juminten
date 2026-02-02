import * as Joi from "joi"

export const CouchbaseSchema = Joi.object({
  COUCHBASE_CONNECTION_STRING: Joi.string().required(),
  COUCHBASE_BUCKET: Joi.string().required(),
  COUCHBASE_SCOPE: Joi.string().required(),
  COUCHBASE_USERNAME: Joi.string().required(),
  COUCHBASE_PASSWORD: Joi.string().required(),
})
