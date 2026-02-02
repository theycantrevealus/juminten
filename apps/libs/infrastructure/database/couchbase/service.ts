import { Bucket, Cluster } from "couchbase"
import { CouchbaseConnectionOptions } from "./interface"
import { Injectable } from "@nestjs/common"
import { randomUUID } from "crypto"

@Injectable()
export class CouchbaseConnection {
  constructor(
    private readonly cluster: Cluster,
    private readonly options: CouchbaseConnectionOptions,
  ) {}

  getCluster(): Cluster {
    return this.cluster
  }

  getScope(): string {
    return this.options.scopeName
  }

  getBucketName(): string {
    return this.options.bucketName
  }

  getBucket(): Bucket {
    return this.cluster.bucket(this.options.bucketName)
  }

  generateId(): string {
    return randomUUID()
  }

  formatId(id): string {
    return id.replace(/[:{}"]/g, "_")
  }
}
