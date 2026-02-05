import { PrimeData, Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { PIC } from "../../schema/pic.schema"
import { DocumentExistsError, DocumentNotFoundError, MutateInSpec } from "couchbase"
import { CONNECTION_TOKEN } from "../constant"
import { CouchbaseInstance } from "../service"
import { QueryOptions } from "../interface"

@Injectable()
export class PICRepositoryCouchbase implements Repository<PIC> {
    constructor(
        @Inject(CONNECTION_TOKEN("default"))
        private readonly couchbaseInstance: CouchbaseInstance,
    ) { }

    async findAll(options?: QueryOptions): Promise<PIC[] | PrimeData<PIC>> {
        try {
            const { dataQuery, countQuery } = this.couchbaseInstance.buildN1qlQuery(
                "pic",
                options,
            )

            // Add soft delete filter: show records where deleted_at is NULL or MISSING or false
            let query = dataQuery.query
            let countQueryStr = countQuery?.query || ""
            if (options?.withSoft === undefined || options?.withSoft === false) {
                const softDeleteFilter = "(`deleted_at` IS NULL OR `deleted_at` IS MISSING OR `deleted_at` = false)"
                if (query.includes("WHERE")) {
                    query = query.replace("WHERE", `WHERE ${softDeleteFilter} AND`)
                } else {
                    const orderByIndex = query.indexOf("ORDER BY")
                    const limitIndex = query.indexOf("LIMIT")
                    const insertPos = orderByIndex > -1 ? orderByIndex : (limitIndex > -1 ? limitIndex : query.length)
                    query = query.slice(0, insertPos) + ` WHERE ${softDeleteFilter} ` + query.slice(insertPos)
                }
                // Also update count query
                if (countQueryStr) {
                    if (countQueryStr.includes("WHERE")) {
                        countQueryStr = countQueryStr.replace("WHERE", `WHERE ${softDeleteFilter} AND`)
                    } else {
                        countQueryStr = countQueryStr + ` WHERE ${softDeleteFilter}`
                    }
                }
            }

            const cluster = this.couchbaseInstance.getCluster()
            const result = await cluster.query<PIC>(query, {
                parameters: dataQuery.params,
            })

            if (options?.withPagination) {
                const countResult = await cluster.query(countQueryStr, {
                    parameters: countQuery!.params,
                })

                const totalRecords = countResult.rows[0].totalRecords
                const limit = dataQuery.params.limit
                const offset = dataQuery.params.offset

                return {
                    data: result.rows,
                    totalRecords,
                    first: offset,
                    rows: limit,
                    totalPages: Math.ceil(totalRecords / limit),
                    currentPage: Math.floor(offset / limit) + 1,
                }
            } else {
                return result.rows
            }
        } catch (error) {
            console.error("PIC findAll error:", error)
            throw new Error(error)
        }
    }

    async findOne(id: string): Promise<PIC> {
        try {
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("pic")
            const result = await collection.get(id)
            return result.content as PIC
        } catch (error) {
            if (error instanceof DocumentNotFoundError) {
                throw new Error(`Error: Document is not found`)
            } else {
                throw new Error(error)
            }
        }
    }

    async create(entity: PIC, id: string): Promise<PIC> {
        const buildId =
            id || id !== ""
                ? this.couchbaseInstance.formatId(id)
                : this.couchbaseInstance.generateId()
        try {
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("pic")
            const data = PIC.create(entity)
            await collection.insert(buildId, data)
            return data
        } catch (error) {
            if (error instanceof DocumentExistsError) {
                throw new Error(`Error: Document with key "${buildId}" already exists`)
            } else {
                throw new Error(error)
            }
        }
    }

    async update(id: string, entity: Partial<PIC>): Promise<Partial<PIC>> {
        try {
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("pic")
            const updatedEntity = {
                ...entity,
                updated_at: new Date(),
            }
            await collection.upsert(id, updatedEntity)
            return updatedEntity
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
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("pic")
            await collection.remove(id)
        } catch (error) {
            if (error instanceof DocumentNotFoundError) {
                throw new Error(`Error: Document is not found`)
            } else {
                throw new Error(error)
            }
        }
    }

    async deleteSoft(id: string): Promise<void> {
        try {
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("pic")
            await collection.mutateIn(id, [
                MutateInSpec.upsert("deleted_at", new Date()),
            ])
        } catch (error) {
            if (error instanceof DocumentNotFoundError) {
                throw new Error(`Error: Document is not found`)
            } else {
                throw new Error(error)
            }
        }
    }
}
