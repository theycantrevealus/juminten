import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { TimeManagement } from "@util/time"
import { Type } from "class-transformer"
import mongoose, { Document, SchemaTypes } from "mongoose"
import { Account } from "./account.schema"

export type LovDocument = LOV & Document

@Schema()
export class LOV {
  @Prop({ type: SchemaTypes.String })
  group_name: string

  @Prop({ type: SchemaTypes.String, unique: true })
  set_value: any

  @Prop({ type: SchemaTypes.String })
  description: string

  @Prop({ type: mongoose.Schema.Types.Mixed })
  additional: object | any

  @Prop({ type: mongoose.Schema.Types.Mixed, ref: Account.name })
  @Type(() => Account)
  created_by: any | null

  @Prop({
    type: SchemaTypes.Date,
    default: () => new TimeManagement().getTimezone("Asia/Jakarta"),
  })
  created_at: Date

  @Prop({
    type: SchemaTypes.Date,
    default: () => new TimeManagement().getTimezone("Asia/Jakarta"),
  })
  updated_at: Date

  @Prop({ type: SchemaTypes.Mixed, default: null })
  deleted_at: Date | null
}

export const LovSchema = SchemaFactory.createForClass(LOV)
