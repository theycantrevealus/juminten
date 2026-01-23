import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, HydratedDocument, SchemaTypes } from "mongoose"

export type RoleDocument = HydratedDocument<Role>

@Schema()
export class Role {
  @Prop({ type: SchemaTypes.String })
  role_id: string

  @Prop({ type: SchemaTypes.String })
  name: string

  @Prop({ type: SchemaTypes.String })
  desc: string

  @Prop({ type: SchemaTypes.Array })
  authorizes: []

  @Prop({ type: SchemaTypes.String })
  status: string
}

export const RoleSchema = SchemaFactory.createForClass(Role)
