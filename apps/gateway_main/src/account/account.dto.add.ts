import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator"

export class DTOAccountAdd {
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

  @IsString()
  status: string

  @IsString()
  @IsOptional()
  line_id: string

  @IsString()
  type: string = "merchant"

  @IsString()
  agent: string

  @IsString()
  legacy_user_id: string

  @IsString()
  location: string
}
