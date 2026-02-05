import { Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { Program } from "../../schema/program.schema"
import { DocumentExistsError, DocumentNotFoundError, MutateInSpec } from "couchbase"
import { CONNECTION_TOKEN } from "../constant"
import { CouchbaseInstance } from "../service"
import { QueryOptions } from "../interface"

@Injectable()
export class ProgramRepositoryCouchbase implements Repository<Program> {
    constructor(
        @Inject(CONNECTION_TOKEN("default"))
        private readonly couchbaseInstance: CouchbaseInstance,
    ) { }

    async findAll(options?: QueryOptions): Promise<Program[]> {
        try {
            const { query: baseQuery, params } = this.couchbaseInstance.buildN1qlQuery(
                "program",
                options,
            )

            // Add soft delete filter: show records where deleted_at is NULL or MISSING
            let query = baseQuery
            if (options?.withSoft === undefined || options?.withSoft === false) {
                if (query.includes("WHERE")) {
                    query = query.replace("WHERE", "WHERE (`deleted_at` IS NULL OR `deleted_at` IS MISSING) AND")
                } else {
                    // Find position before ORDER BY, LIMIT, or end
                    const orderByIndex = query.indexOf("ORDER BY")
                    const limitIndex = query.indexOf("LIMIT")
                    const insertPos = orderByIndex > -1 ? orderByIndex : (limitIndex > -1 ? limitIndex : query.length)
                    query = query.slice(0, insertPos) + " WHERE (`deleted_at` IS NULL OR `deleted_at` IS MISSING) " + query.slice(insertPos)
                }
            }

            const cluster = this.couchbaseInstance.getCluster()
            const result = await cluster.query<Program>(query, { parameters: params })
            return result.rows
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOne(id: string): Promise<Program> {
        try {
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("program")
            const result = await collection.get(id)
            return result.content as Program
        } catch (error) {
            if (error instanceof DocumentNotFoundError) {
                throw new Error(`Error: Document is not found`)
            } else {
                throw new Error(error)
            }
        }
    }

    async findByName(name: string): Promise<Program | null> {
        try {
            const cluster = this.couchbaseInstance.getCluster()
            const bucketName = this.couchbaseInstance.getBucket().name
            const query = `SELECT * FROM \`${bucketName}\`._default.program WHERE name = $name AND (deleted_at IS NULL OR deleted_at IS MISSING) LIMIT 1`
            const result = await cluster.query<Program>(query, { parameters: { name } })
            return result.rows.length > 0 ? result.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async create(entity: Program, id: string): Promise<Program> {
        const buildId =
            id || id !== ""
                ? this.couchbaseInstance.formatId(id)
                : this.couchbaseInstance.generateId()
        try {
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("program")
            const data = Program.create(entity)
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

    async update(id: string, entity: Partial<Program>): Promise<Partial<Program>> {
        try {
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("program")
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
            const collection = bucket.collection("program")
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
            const collection = bucket.collection("program")
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
