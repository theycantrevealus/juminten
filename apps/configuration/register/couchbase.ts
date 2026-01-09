import { registerAs } from "@nestjs/config"

export const CouchbaseConfig = registerAs("couchbase", () => ({
  connectionString: process.env.COUCHBASE_CONNECTION_STRING,
  bucket: process.env.COUCHBASE_BUCKET,
  username: process.env.COUCHBASE_USERNAME,
  password: process.env.COUCHBASE_PASSWORD,
}))
