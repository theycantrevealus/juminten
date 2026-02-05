import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Validate,
    ValidateNested,
} from "class-validator"
import { Type } from "class-transformer"
import { ProgramTimeZone } from "@database/schema/program.schema"
import { DTOProgramNotification } from "./program.dto.create"
import { TimezoneOffsetValidator } from "@shared/validators/timezone.validator"

/**
 * DTO for updating an existing program
 * All fields are optional for partial updates
 */
export class DTOUpdateProgram {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    desc?: string

    @IsEnum(ProgramTimeZone, { message: "program_time_zone must be WIB, WITA, or WIT" })
    @IsOptional()
    program_time_zone?: ProgramTimeZone

    @IsDateString({}, { message: "start_period must be a valid ISO 8601 date string" })
    @IsOptional()
    @Validate(TimezoneOffsetValidator, {
        message: "start_period timezone offset must match program_time_zone",
    })
    start_period?: string

    @IsDateString({}, { message: "end_period must be a valid ISO 8601 date string" })
    @IsOptional()
    @Validate(TimezoneOffsetValidator, {
        message: "end_period timezone offset must match program_time_zone",
    })
    end_period?: string

    @IsString()
    @IsOptional()
    keyword_registration?: string

    @IsNumber()
    @IsOptional()
    point_registration?: number

    @IsBoolean()
    @IsOptional()
    whitelist_counter?: boolean

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DTOProgramNotification)
    @IsOptional()
    program_notification?: DTOProgramNotification[]

    @IsBoolean()
    @IsOptional()
    is_draft?: boolean

    @IsBoolean()
    @IsOptional()
    is_stoped?: boolean

    @IsBoolean()
    @IsOptional()
    need_review_after_edit?: boolean
}
