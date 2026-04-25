import { Bucket, Cluster } from "couchbase"
import { CouchbaseConnectionOptions, QueryOptions } from "./interface"
import { Injectable } from "@nestjs/common"
import { randomUUID, hash } from "crypto"

@Injectable()
export class CouchbaseInstance {
  constructor(
    private readonly cluster: Cluster,
    private readonly options: CouchbaseConnectionOptions,
  ) {}

  /**
   * Get configured cluster
   * @returns { Cluster }
   */
  getCluster(): Cluster {
    return this.cluster
  }

  /**
   * Get configured scope
   * @returns { string }
   */
  getScope(): string {
    return this.options.scopeName ?? ""
  }

  /**
   * Get configured bucket name
   * @returns { string }
   */
  getBucketName(): string {
    return this.options.bucketName
  }

  /**
   * Get bucket instance
   * @returns { Bucket }
   */
  getBucket(): Bucket {
    return this.cluster.bucket(this.options.bucketName)
  }

  /**
   * Generate random uuid
   * @returns { string }
   */
  generateId(): string {
    return randomUUID()
  }

  /**
   * Hash given string
   * @param { string } id - id string to format
   * @returns { string }
   */
  hashId(id: string): string {
    return hash("sha256", id)
  }

  /**
   * Format json format notation
   *
   * @param { string } id - id string to format
   * @returns { string }
   */
  formatId(id): string {
    return id.replace(/[:{}"]/g, "_")
  }

  /**
   * Build where param clause from JSON clause
   *
   * @param { Record<string, any> } params - parameter
   * @param { Record<string, any> } where - where clause
   * @returns
   */
  private buildWhereClause(
    params: Record<string, any>,
    where?: Record<string, any>,
  ): string {
    if (!where || Object.keys(where).length === 0) return ""

    const conditions: string[] = []

    for (const [key, value] of Object.entries(where)) {
      const field = `\`${key}\``

      if (typeof value !== "object" || value === null) {
        if (value === null) {
          conditions.push(`${field} IS NULL`)
        } else if (value === undefined) {
          conditions.push(`${field} IS MISSING`)
        } else {
          params[key] = value
          conditions.push(`${field} = $${key}`)
        }
        continue
      }

      for (const [op, v] of Object.entries(value)) {
        const paramKey = `${key}_${op}`

        switch (op) {
          case "eq":
            params[paramKey] = v
            conditions.push(`${field} = $${paramKey}`)
            break

          case "ne":
            params[paramKey] = v
            conditions.push(`${field} != $${paramKey}`)
            break

          case "startsWith":
            params[paramKey] = `${v}%`
            conditions.push(`${field} LIKE $${paramKey}`)
            break

          case "endsWith":
            params[paramKey] = `%${v}`
            conditions.push(`${field} LIKE $${paramKey}`)
            break

          case "contains":
            params[paramKey] = `%${v}%`
            conditions.push(`${field} LIKE $${paramKey}`)
            break

          default:
            throw new Error(`Unsupported operator: ${op}`)
        }
      }
    }

    return conditions.length ? ` WHERE ${conditions.join(" AND ")}` : ""
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
