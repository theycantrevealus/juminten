import { PrimeData, Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { LOV } from "../../schema/lov.schema"
import {
  DocumentExistsError,
  DocumentNotFoundError,
  MutateInSpec,
} from "couchbase"
import { CONNECTION_TOKEN } from "../constant"
import { CouchbaseInstance } from "../service"
import { QueryOptions } from "../interface"

@Injectable()
export class LOVRepositoryCouchbase implements Repository<LOV> {
  constructor(
    @Inject(CONNECTION_TOKEN("default"))
    private readonly couchbaseInstance: CouchbaseInstance,
  ) {}

  async findAll(options: QueryOptions): Promise<LOV[] | PrimeData<LOV>> {
    try {
      if (options.withSoft === undefined || options.withSoft === false) {
        options.where = { ...options.where, deleted_at: false }
      }

      const { dataQuery, countQuery } = this.couchbaseInstance.buildN1qlQuery(
        "lov",
        options,
      )

      const cluster = this.couchbaseInstance.getCluster()
      const result = await cluster.query<LOV>(dataQuery.query, {
        parameters: dataQuery.params,
      })

      if (options.withPagination) {
        const countResult = await cluster.query(countQuery!.query, {
          parameters: countQuery!.params,
        })

        const totalRecords = countResult.rows[0].totalRecords
        const limit = dataQuery.params.limit
        const offset = dataQuery.params.offset

        return {
          data: result.rows,
          totalRecords,
          first: offset + 1,
          rows: limit,
          totalPages: Math.ceil(totalRecords / limit),
          currentPage: Math.floor(offset / limit) + 1,
        }
      } else {
        return result.rows
      }
    } catch (error) {
      throw new Error(`Error : ${error}`)
    }
  }

  async findOne(id: string): Promise<LOV> {
    throw new Error("Method not implemented.")
  }

  async create(entity: LOV, id: string): Promise<LOV> {
    const buildId =
      id || id !== ""
        ? this.couchbaseInstance.formatId(id)
        : this.couchbaseInstance.generateId()
    try {
      const bucket = this.couchbaseInstance.getBucket()
      const collection = bucket.collection("lov")
      const data = LOV.create(entity)

      await collection.insert(buildId, data)
      return entity
    } catch (error) {
      if (error instanceof DocumentExistsError) {
        throw new Error(`Error: Document with key "${buildId}" already exists`)
      } else {
        throw new Error(`Error : ${error}`)
      }
    }
  }

  async update(id: string, entity: Partial<LOV>): Promise<Partial<LOV>> {
    try {
      const bucket = this.couchbaseInstance.getBucket()
      const collection = bucket.collection("lov")
      await collection.upsert(id, entity)
      return entity
    } catch (error) {
      if (error instanceof DocumentNotFoundError) {
        throw new Error(`Error: Document is not found`)
      } else {
        throw new Error(`Error : ${error}`)
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const bucket = this.couchbaseInstance.getBucket()
      const collection = bucket.collection("lov")
      await collection.remove(id)
    } catch (error) {
      if (error instanceof DocumentNotFoundError) {
        throw new Error(`Error: Document is not found`)
      } else {
        throw new Error(`Error : ${error}`)
      }
    }
  }

  async deleteSoft(id: string): Promise<void> {
    try {
      const bucket = this.couchbaseInstance.getBucket()
      const collection = bucket.collection("lov")
      await collection.mutateIn(id, [
        MutateInSpec.upsert("deleted_at", new Date()),
      ])
    } catch (error) {
      if (error instanceof DocumentNotFoundError) {
        throw new Error(`Error: Document is not found`)
      } else {
        throw new Error(`Error : ${error}`)
      }
    }
  }
}
