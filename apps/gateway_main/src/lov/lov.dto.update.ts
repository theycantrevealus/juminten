import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class DTOUpdateLOV {
  @IsString()
  @IsNotEmpty()
  group_name: string

  @IsNotEmpty()
  set_value: any

  @IsString()
  @IsOptional()
  description: string

  @IsOptional()
  additional: object | any
}
