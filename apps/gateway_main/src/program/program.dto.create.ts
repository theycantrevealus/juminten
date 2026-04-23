import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator"

export class DTOCreateProgram {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsDateString()
  @IsNotEmpty()
  start_period!: Date

  @IsDateString()
  @IsNotEmpty()
  end_period!: Date

  @IsString()
  @IsNotEmpty()
  @Matches(/^lov::/, {
    message: 'ID must start with "lov::"',
  })
  point_type!: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^lov::/, {
    message: 'ID must start with "lov::"',
  })
  point_mechanism!: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^lov::/, {
    message: 'ID must start with "lov::"',
  })
  point_owner!: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^lov::/, {
    message: 'ID must start with "lov::"',
  })
  point_owner_detail!: string

  @IsString()
  @IsNotEmpty()
  keyword_registration!: string

  @IsNumber()
  @IsNotEmpty()
  point_registration!: number

  @IsBoolean()
  @IsNotEmpty()
  whitelist_counter!: boolean

  @IsString()
  @IsNotEmpty()
  logic!: string

  @IsString()
  @IsNotEmpty()
  program_time_zone!: string

  @IsString()
  @IsNotEmpty()
  program_group!: string

  @IsString()
  @IsNotEmpty()
  alarm_pic_type!: string

  @IsString()
  @IsNotEmpty()
  alarm_pic!: string

  @IsString()
  @IsNotEmpty()
  threshold_alarm_expired!: string

  @IsString()
  @IsNotEmpty()
  threshold_alarm_voucher!: string

  @IsString()
  @IsNotEmpty()
  program_notification!: string

  @IsString()
  @IsNotEmpty()
  program_approval!: string

  @IsString()
  @IsNotEmpty()
  hq_approver!: string

  @IsString()
  @IsNotEmpty()
  non_hq_approver!: string

  @IsString()
  @IsNotEmpty()
  program_parent!: string

  @IsBoolean()
  @IsNotEmpty()
  is_draft!: boolean

  @IsString()
  @IsNotEmpty()
  is_stoped!: string

  @IsString()
  @IsNotEmpty()
  need_review_after_edit!: string

  @IsString()
  @IsNotEmpty()
  created_by!: string

  @IsString()
  @IsOptional()
  desc: string = ""
}
