import { Program, ProgramTimeZone } from "@database/schema/program.schema"
import { Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_PROGRAM } from "@shared/repository"
import { DTOCreateProgram } from "./program.dto.create"
import { DTOUpdateProgram } from "./program.dto.update"
import { DTOPrimeTableQuery, PrimeTableResponse } from "./program.dto.prime"
import {
    formatDateWithTimezone,
    isValidTimezoneCode,
    TimezoneCode,
} from "@shared/timezone.util"

@Injectable()
export class ProgramService {
    constructor(
        @Inject(REPOSITORY_PROGRAM)
        private readonly repoProgram: Repository<Program>,
    ) { }

    /**
     * Transform program data dengan timezone formatting
     * Business logic: Format dates based on program_time_zone
     *
     * @param program - Program data from repository
     * @returns Program with formatted timezone dates
     */
    private transformProgramResponse(program: Program): Program {
        if (!program) return program

        const timezone = program.program_time_zone as string

        // Only transform if valid timezone and dates exist
        if (timezone && isValidTimezoneCode(timezone)) {
            const tz = timezone as TimezoneCode

            if (program.start_period) {
                program.start_period = formatDateWithTimezone(
                    program.start_period,
                    tz,
                )
            }

            if (program.end_period) {
                program.end_period = formatDateWithTimezone(
                    program.end_period,
                    tz,
                )
            }
        }

        return program
    }

    /**
     * Return all Program data partially by filter, projection, and etc
     *
     * @returns { Program[] }
     */
    async all(config = {}): Promise<Program[]> {
        const programs = await this.repoProgram.findAll({
            fields: [
                "name",
                "desc",
                "program_time_zone",
                "start_period",
                "end_period",
                "keyword_registration",
                "point_registration",
                "whitelist_counter",
                "program_notification",
                "is_draft",
                "is_stoped",
                "need_review_after_edit",
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
        })

        // Apply business transformation for timezone
        return programs.map((p) => this.transformProgramResponse(p))
    }

    /**
     * Return Program data in PrimeNG table format with pagination, sorting, and filtering
     *
     * @param { DTOPrimeTableQuery } query - Query params from PrimeNG table
     * @returns { PrimeTableResponse<Program> }
     */
    async allPrime(query: DTOPrimeTableQuery): Promise<PrimeTableResponse<Program>> {
        const { first = 0, rows = 10, sortField, sortOrder, globalFilter } = query

        // Get all records for total count and filtering
        let allRecords = await this.repoProgram.findAll({
            fields: [
                "name",
                "desc",
                "program_time_zone",
                "start_period",
                "end_period",
                "keyword_registration",
                "point_registration",
                "whitelist_counter",
                "program_notification",
                "is_draft",
                "is_stoped",
                "need_review_after_edit",
                "created_by",
                "created_at",
                "updated_at",
            ],
            orderBy: sortField ? {
                field: sortField,
                direction: sortOrder === -1 ? "DESC" : "ASC",
            } : {
                field: "name",
                direction: "ASC",
            },
        })

        // Apply global filter in-memory (case-insensitive)
        if (globalFilter) {
            const filterLower = globalFilter.toLowerCase()
            allRecords = allRecords.filter(record =>
                record.name?.toLowerCase().includes(filterLower) ||
                record.desc?.toLowerCase().includes(filterLower) ||
                record.keyword_registration?.toLowerCase().includes(filterLower)
            )
        }

        const totalRecords = allRecords.length
        const totalPages = Math.ceil(totalRecords / rows)
        const currentPage = Math.floor(first / rows) + 1

        // Apply pagination in-memory
        const paginatedData = allRecords.slice(first, first + rows)

        // Apply business transformation for timezone
        const data = paginatedData.map((p) => this.transformProgramResponse(p))

        return {
            data,
            totalRecords,
            first,
            rows,
            totalPages,
            currentPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
        }
    }

    /**
     * Add new Program
     *
     * @param { DTOCreateProgram } payload - Program data to create
     * @param { any } createdBy - User who creates this record
     * @returns { void }
     */
    async create(payload: DTOCreateProgram, createdBy: any): Promise<void> {
        await this.repoProgram.create(
            {
                ...payload,
                created_by: createdBy,
            } as Program,
            `program::${payload.name.toLowerCase().replace(/\s+/g, "_")}`,
        )
    }

    /**
     * Update Program
     *
     * @param { string } id - ID to update
     * @param { DTOUpdateProgram } payload - Program data to update
     */
    async update(id: string, payload: DTOUpdateProgram): Promise<void> {
        // Get existing data first
        const existingData = await this.repoProgram.findOne(id)

        // Merge existing data with new payload (timestamps handled by repository)
        await this.repoProgram.update(id, {
            ...existingData,
            ...payload,
        })
    }

    /**
     * Delete Program
     *
     * @param { string } id - ID to delete
     * @returns { void }
     */
    async remove(id: string): Promise<void> {
        await this.repoProgram.delete(id)
    }

    /**
     * Delete Program soft
     *
     * @param { string } id - ID to delete
     * @returns { void }
     */
    async removeSoft(id: string): Promise<void> {
        await this.repoProgram.deleteSoft(id)
    }
}
