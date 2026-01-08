import { Prop, Schema } from "nestjs-couchbase"

@Schema({
  collection: "account",
  scope: "testing",
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
})
export class Account {
  @Prop({ required: false })
  user_id: string

  // @Prop({ required: false, default: "" })
  @Prop()
  core_role: string

  @Prop({ required: true })
  user_name: string

  @Prop({ required: true })
  first_name: string

  @Prop()
  last_name: string

  @Prop({ default: "" })
  job_title: string

  @Prop()
  job_level: string

  @Prop()
  phone: string

  @Prop()
  email: string

  @Prop()
  status: string

  @Prop()
  line_id: string

  @Prop()
  type: string

  @Prop()
  agent: string

  @Prop()
  legacy_user_id: string | null
}
