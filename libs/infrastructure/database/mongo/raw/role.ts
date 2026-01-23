import { raw } from "@nestjs/mongoose"

export interface IRole {
  role_id: string
  name: string
}

export const RawRole = raw({
  role_id: { type: String },
  name: { type: String },
})
