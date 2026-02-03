import { Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { LOV } from "../../schema/lov.schema"
import { DocumentExistsError, DocumentNotFoundError } from "couchbase"
import { CONNECTION_TOKEN } from "../constant"
import { CouchbaseInstance } from "../service"

@Injectable()
export class LOVRepositoryCouchbase implements Repository<LOV> {
  constructor(
    @Inject(CONNECTION_TOKEN("default"))
    private readonly connection: CouchbaseInstance,
  ) {}

  async findAll(): Promise<LOV[]> {
    try {
      const bucket = this.connection.getBucketName()
      const scope = this.connection.getScope()
      const cluster = this.connection.getCluster()

      const keyspace = `\`${bucket}\`.\`${scope}\`.\`lov\``
      const queryStatement = `SELECT META().id, group_name, set_value, description, additional FROM ${keyspace} LIMIT 10`

      const result = await cluster.query<LOV>(queryStatement)
      return result.rows
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: string): Promise<LOV> {
    throw new Error("Method not implemented.")
  }

  async create(entity: LOV, id: string): Promise<LOV> {
    const buildId =
      id || id !== ""
        ? this.connection.formatId(id)
        : this.connection.generateId()
    try {
      const bucket = this.connection.getBucket()
      const collection = bucket.collection("lov")
      await collection.insert(buildId, entity)
      return entity
    } catch (error) {
      if (error instanceof DocumentExistsError) {
        throw new Error(`Error: Document with key "${buildId}" already exists`)
      } else {
        throw new Error(error)
      }
    }
  }
  async update(id: string, entity: Partial<LOV>): Promise<Partial<LOV>> {
    try {
      const bucket = this.connection.getBucket()
      const collection = bucket.collection("lov")
      await collection.upsert(id, entity)
      return entity
    } catch (error) {
      if (error instanceof DocumentNotFoundError) {
        throw new Error(`Error: Document is not found`)
      } else {
        throw new Error(error)
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const bucket = this.connection.getBucket()
      const collection = bucket.collection("lov")
      await collection.remove(id)
    } catch (error) {
      if (error instanceof DocumentNotFoundError) {
        throw new Error(`Error: Document is not found`)
      } else {
        throw new Error(error)
      }
    }
  }
}
