import { IsNumber, IsOptional, IsString } from "class-validator"
import { Transform } from "class-transformer"

/**
 * DTO for PrimeNG Table lazy loading
 * Supports pagination, sorting, and global filtering
 */
export class DTOPrimeTableQuery {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    first?: number = 0

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    rows?: number = 10

    @IsOptional()
    @IsString()
    sortField?: string

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    sortOrder?: number = 1 // 1 = ASC, -1 = DESC

    @IsOptional()
    @IsString()
    globalFilter?: string
}

/**
 * Response format for PrimeNG Table
 */
export interface PrimeTableResponse<T> {
    data: T[]
    totalRecords: number
    first: number
    rows: number
    // Pagination helpers
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
}
