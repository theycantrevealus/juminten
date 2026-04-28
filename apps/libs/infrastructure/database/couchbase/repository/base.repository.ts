import { PrimeData, Repository } from "@database/provider/interface"
import { Injectable } from "@nestjs/common"
import {
  DocumentExistsError,
  DocumentNotFoundError,
  MutateInSpec,
} from "couchbase"
import { CouchbaseInstance } from "../service"
import { QueryOptions } from "../interface"

@Injectable()
export abstract class BaseCouchbaseRepository<T> implements Repository<T> {
  constructor(
    protected readonly couchbaseInstance: CouchbaseInstance,
    protected readonly collectionName: string,
    protected readonly factory?: (data: Partial<T>) => T,
  ) {}

  findOne(id: string): Promise<T | null> {
    throw new Error("Method not implemented.")
  }

  async findAll(options: QueryOptions): Promise<T[] | PrimeData<T>> {
    try {
      if (options.withSoft === undefined || options.withSoft === false) {
        options.where = { ...options.where, deleted_at: false }
      }

      const { dataQuery, countQuery } = this.couchbaseInstance.buildN1qlQuery(
        this.collectionName,
        options,
      )

      const cluster = this.couchbaseInstance.getCluster()
      const result = await cluster.query<T>(dataQuery.query, {
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

  async create(entity: T, id?: string): Promise<T> {
    const buildId = id?.trim() ? id : this.couchbaseInstance.generateId()
    try {
      const bucket = this.couchbaseInstance.getBucket()
      const scope = bucket.scope(this.couchbaseInstance.getScope())
      const collection = scope.collection(this.collectionName)
      const data = this.factory ? this.factory(entity) : entity

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

  async update(id: string, entity: Partial<T>): Promise<Partial<T>> {
    try {
      const bucket = this.couchbaseInstance.getBucket()
      const scope = bucket.scope(this.couchbaseInstance.getScope())
      const collection = scope.collection(this.collectionName)

      await collection.upsert(id, {
        ...entity,
        updated_at: new Date(),
      })

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
      const scope = bucket.scope(this.couchbaseInstance.getScope())
      const collection = scope.collection(this.collectionName)

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
      const scope = bucket.scope(this.couchbaseInstance.getScope())
      const collection = scope.collection(this.collectionName)

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