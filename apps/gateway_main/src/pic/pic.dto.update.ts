import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator"

export class DTOUpdatePIC {
    @IsString()
    @IsOptional()
    @MinLength(6, { message: "Name must be at least 6 characters" })
    @Matches(/^[a-zA-Z]+$/, { message: "Name must contain only alphabetic characters" })
    name?: string

    @IsString()
    @IsOptional()
    @MinLength(11, { message: "MSISDN must be at least 11 characters" })
    @MaxLength(14, { message: "MSISDN must be at most 14 characters" })
    msisdn?: string

    @IsEmail({}, { message: "Invalid email format" })
    @IsOptional()
    @MinLength(8, { message: "Email must be at least 8 characters" })
    email?: string
}
