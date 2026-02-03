import { Bucket, Cluster } from "couchbase"
import { CouchbaseConnectionOptions, QueryOptions } from "./interface"
import { Injectable } from "@nestjs/common"
import { randomUUID } from "crypto"

@Injectable()
export class CouchbaseInstance {
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

  buildN1qlQuery(collectionName: string, options: QueryOptions = {}) {
    const params: Record<string, any> = {}

    const projection =
      options.select && options.select.length > 0
        ? options.select.map((f) => `\`${f}\``).join(", ")
        : "*"

    let query = `
    SELECT ${projection}
    FROM \`${this.getBucketName()}\`.\`${this.getScope()}\`.\`${collectionName}\``

    if (options.where && Object.keys(options.where).length > 0) {
      const conditions = Object.entries(options.where).map(([key, value]) => {
        params[key] = value
        return `\`${key}\` = $${key}`
      })

      query += ` WHERE ${conditions.join(" AND ")}`
    }

    if (options.orderBy) {
      query += ` ORDER BY \`${options.orderBy.field}\` ${options.orderBy.direction ?? "ASC"}`
    }

    if (options.limit !== undefined) {
      query += ` LIMIT $limit`
      params.limit = options.limit
    }

    if (options.offset !== undefined) {
      query += ` OFFSET $offset`
      params.offset = options.offset
    }

    return { query, params }
  }
}
