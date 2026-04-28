import {
  IsArray,
  IsOptional,
  IsString,
} from "class-validator"

export class DTOUpdateRole {
  @IsString()
  role_id!: string

  @IsString()
  name!: string

  @IsString()
  desc!: string

  @IsOptional()
  @IsArray()
  authorizes: any[] = []

  @IsString()
  status!: string
}