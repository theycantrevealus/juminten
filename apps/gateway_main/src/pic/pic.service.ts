import { PIC } from "@database/schema/pic.schema"
import { PrimeData, Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_PIC } from "@shared/repository"
import { DTOCreatePIC } from "./pic.dto.create"
import { DTOUpdatePIC } from "./pic.dto.update"
import { DTOPrimeTableQuery, PrimeTableResponse } from "./pic.dto.prime"

@Injectable()
export class PICService {
    constructor(
        @Inject(REPOSITORY_PIC)
        private readonly repoPIC: Repository<PIC>,
    ) { }

    /**
     * Return all PIC data partially by filter, projection, and etc
     *
     * @returns { PIC[] }
     */
    async all(config = {}): Promise<PIC[]> {
        return await this.repoPIC.findAll({
            fields: [
                "email",
                "msisdn",
                "name",
                "created_by",
                "created_at",
                "updated_at",
            ],
            orderBy: {
                field: "name",
                direction: "ASC",
            },
            limit: 10,
            offset: 0,
        }) as PIC[]
    }

    /**
     * Return PIC data in PrimeNG table format with pagination, sorting, and filtering
     *
     * @param { DTOPrimeTableQuery } query - Query params from PrimeNG table
     * @returns { PrimeTableResponse<PIC> }
     */
    async allPrime(query: DTOPrimeTableQuery): Promise<PrimeTableResponse<PIC>> {
        const { first = 0, rows = 10, sortField, sortOrder, globalFilter } = query

        const fields = [
            "email",
            "msisdn",
            "name",
            "created_by",
            "created_at",
            "updated_at",
        ]

        const orderBy = sortField ? {
            field: sortField,
            direction: sortOrder === -1 ? "DESC" : "ASC",
        } : {
            field: "name",
            direction: "ASC",
        }

        // If globalFilter is present, fetch all and filter in-memory (multi-field OR logic)
        if (globalFilter) {
            let allRecords = await this.repoPIC.findAll({
                fields,
                orderBy: orderBy as { field: string; direction: "ASC" | "DESC" },
            }) as PIC[]

            // Apply global filter in-memory (case-insensitive)
            const filterLower = globalFilter.toLowerCase()
            allRecords = allRecords.filter(record =>
                record.name?.toLowerCase().includes(filterLower) ||
                record.email?.toLowerCase().includes(filterLower) ||
                record.msisdn?.includes(globalFilter)
            )

            const totalRecords = allRecords.length
            const totalPages = Math.ceil(totalRecords / rows)
            const currentPage = Math.floor(first / rows) + 1

            // Apply pagination in-memory
            const data = allRecords.slice(first, first + rows)

            return {
                data,
                totalRecords,
                first,
                rows,
                totalPages,
                currentPage,
            }
        }

        // No globalFilter: use database-level pagination
        const result = await this.repoPIC.findAll({
            fields,
            orderBy: orderBy as { field: string; direction: "ASC" | "DESC" },
            limit: Number(rows),
            offset: Number(first),
            withPagination: true,
        }) as PrimeData<PIC>

        return {
            data: result.data,
            totalRecords: result.totalRecords,
            first: result.first,
            rows: result.rows,
            totalPages: result.totalPages,
            currentPage: result.currentPage,
        }
    }

    /**
     * Add new PIC
     *
     * @param { DTOCreatePIC } payload - PIC data to create
     * @param { any } createdBy - User who creates this record
     * @returns { void }
     */
    async create(payload: DTOCreatePIC, createdBy: any): Promise<void> {
        await this.repoPIC.create(
            {
                ...payload,
                created_by: createdBy,
            } as PIC,
            `pic::${payload.msisdn}`,
        )
    }

    /**
     * Update PIC
     *
     * @param { string } id - ID to update
     * @param { DTOUpdatePIC } payload - PIC data to update
     */
    async update(id: string, payload: DTOUpdatePIC): Promise<void> {
        // Get existing data first
        const existingData = await this.repoPIC.findOne(id)

        // Merge existing data with new payload (timestamps handled by repository)
        await this.repoPIC.update(id, {
            ...existingData,
            ...payload,
        })
    }

    /**
     * Delete PIC
     *
     * @param { string } id - ID to delete
     * @returns { void }
     */
    async remove(id: string): Promise<void> {
        await this.repoPIC.delete(id)
    }

    /**
     * Delete PIC soft
     *
     * @param { string } id - ID to delete
     * @returns { void }
     */
    async removeSoft(id: string): Promise<void> {
        await this.repoPIC.deleteSoft(id)
    }
}
