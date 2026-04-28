import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ArrayUnique,
} from "class-validator"
import { Type } from "class-transformer"

export class DTOUpdateLocation {
  @IsString()
  code!: string

  @IsString()
  @IsIn(["BOTH", "LACIMA", "Telkomsel"])
  data_source!: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  adhoc_group: string[] = []

  @IsString()
  name!: string

  @IsString()
  type!: string

  @IsString()
  parent!: string

  @Type(() => Number)
  @IsNumber()
  lac!: number

  @Type(() => Number)
  @IsNumber()
  cell_id!: number

  @IsString()
  longitude!: string

  @IsString()
  latitude!: string

  @IsString()
  area!: string

  @IsString()
  prov!: string

  @IsString()
  region!: string

  @IsString()
  city!: string

  @IsOptional()
  @IsString()
  area_id?: string

  @IsOptional()
  @IsString()
  prov_id?: string

  @IsOptional()
  @IsString()
  region_id?: string

  @IsOptional()
  @IsString()
  city_id?: string

  @IsString()
  status!: string

  @IsString()
  timezone!: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  region_detail?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  prov_detail?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  city_detail?: string[]

  @IsOptional()
  @IsString()
  created_by?: string
}