import {
  IsArray,
  IsDateString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator"

export class DTOUpdateAccount {
  @IsString()
  user_id: string

  @IsString()
  core_role: string

  @IsString()
  user_name: string

  @IsString()
  first_name: string

  @IsString()
  last_name: string

  @IsString()
  job_title: string

  @IsString()
  job_level: string

  @IsPhoneNumber()
  phone: string

  @IsEmail()
  email: string

  @IsDateString()
  birthdate: string

  @IsString()
  status: string

  @IsString()
  @IsOptional()
  line_id: string

  @IsString()
  type: string = "merchant"

  @IsString()
  superior_local: string

  @IsString()
  superior_hq: string

  @IsString()
  manager_id: string

  @IsString()
  agent: string

  @IsString()
  legacy_user_id: string

  @IsArray()
  account_location: string[] = []
}
