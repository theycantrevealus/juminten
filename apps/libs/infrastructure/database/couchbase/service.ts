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

  private buildWhereClause(
    params: Record<string, any>,
    where?: Record<string, any>,
  ): string {
    if (!where || Object.keys(where).length === 0) return ""

    const conditions = Object.entries(where).map(([key, value]) => {
      if (value === null) return `\`${key}\` IS NULL`
      if (value === undefined) return `\`${key}\` IS MISSING`

      params[key] = value
      return `\`${key}\` = $${key}`
    })

    return ` WHERE ${conditions.join(" AND ")}`
  }

  /**
   * Build given option to a N1QL query
   * Hint: No need to define META().id on field. It will process as string if defined. It is already handled inside method
   *
   * @param { string } collectionName  - Target collection to fetch
   * @param { QueryOptions } options - Query option
   * @returns
   */
  buildN1qlQuery(
    collectionName: string,
    options: QueryOptions = {},
  ): {
    dataQuery: { query: string; params: Record<string, any> }
    countQuery?: { query: string; params: Record<string, any> }
  } {
    const params: Record<string, any> = {}

    const projection = options.fields?.length
      ? options.fields.map((f) => `\`${f}\``).join(", ")
      : "*"

    const fromClause = `
    FROM \`${this.getBucketName()}\`.\`${this.getScope()}\`.\`${collectionName}\`
  `

    const whereClause = this.buildWhereClause(params, options.where)

    let dataQuery = `
    SELECT META().id, ${projection}
    ${fromClause}
    ${whereClause}
  `

    if (options.orderBy) {
      dataQuery += ` ORDER BY \`${options.orderBy.field}\` ${options.orderBy.direction ?? "ASC"}`
    }

    if (options.limit !== undefined) {
      dataQuery += ` LIMIT $limit`
      params.limit = options.limit
    }

    if (options.offset !== undefined) {
      dataQuery += ` OFFSET $offset`
      params.offset = options.offset
    }

    if (!options.withPagination) {
      return { dataQuery: { query: dataQuery, params } }
    }

    const countParams = { ...params }

    const countQuery = `
    SELECT COUNT(1) AS totalRecords
    ${fromClause}
    ${whereClause}
  `

    return {
      dataQuery: { query: dataQuery, params },
      countQuery: { query: countQuery, params: countParams },
    }
  }
}
