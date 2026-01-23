import { Prop, Schema } from "@nestjs/mongoose"
import { TimeManagement } from "@util/time"
import { Type } from "class-transformer"
import { Document, SchemaTypes, Types } from "mongoose"
import { IRole, RawRole } from "../raw/role"
import { RawAccount } from "../raw/account"
import { IAccount } from "@shared/interface/account.created_by"

export type AccountDocument = Account & Document
@Schema()
export class Account {
  @Prop({ type: SchemaTypes.String })
  user_id: string

  @Prop({ type: SchemaTypes.String, required: false, default: "" })
  core_role: string

  @Prop({ type: SchemaTypes.String })
  user_name: string

  @Prop({ type: SchemaTypes.String })
  first_name: string

  @Prop({ type: SchemaTypes.String })
  last_name: string

  @Prop({ type: SchemaTypes.String })
  job_title: string

  @Prop({ type: SchemaTypes.String })
  job_level: string

  @Prop({ type: SchemaTypes.String })
  phone: string

  @Prop({ type: SchemaTypes.String })
  email: string

  @Prop({ type: SchemaTypes.Date })
  birthdate: Date

  @Prop({ type: SchemaTypes.String })
  status: string

  @Prop({ type: SchemaTypes.String })
  line_id: string

  @Prop({
    type: SchemaTypes.String,
    enum: ["merchant", "business"],
    default: "merchant",
  })
  type: string

  @Prop(RawRole)
  role: IRole

  @Prop(RawAccount)
  superior_local: IAccount

  @Prop(RawAccount)
  superior_hq: IAccount

  @Prop({ type: SchemaTypes.String })
  manager_id: string

  @Prop({ type: SchemaTypes.String, required: false, default: null })
  agent: string

  @Prop({ type: SchemaTypes.String, required: false, default: null })
  legacy_user_id: string

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

  @Prop({ type: SchemaTypes.Mixed })
  account_location: any
}
