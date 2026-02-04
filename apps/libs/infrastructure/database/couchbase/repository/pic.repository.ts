import { Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { PIC } from "../../schema/pic.schema"
import { DocumentExistsError, DocumentNotFoundError } from "couchbase"
import { CONNECTION_TOKEN } from "../constant"
import { CouchbaseInstance } from "../service"
import { QueryOptions } from "../interface"

@Injectable()
export class PICRepositoryCouchbase implements Repository<PIC> {
    constructor(
        @Inject(CONNECTION_TOKEN("default"))
        private readonly couchbaseInstance: CouchbaseInstance,
    ) { }

    async findAll(options?: QueryOptions): Promise<PIC[]> {
        try {
            const { query, params } = this.couchbaseInstance.buildN1qlQuery(
                "pic",
                options,
            )

            const cluster = this.couchbaseInstance.getCluster()
            const result = await cluster.query<PIC>(query, { parameters: params })
            return result.rows
        } catch (error) {
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

    async update(id: string, entity: Partial<PIC>): Promise<Partial<PIC>> {
        try {
            const bucket = this.couchbaseInstance.getBucket()
            const collection = bucket.collection("pic")
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
}
