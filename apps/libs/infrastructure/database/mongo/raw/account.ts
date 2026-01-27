import { raw } from "@nestjs/mongoose"

export interface IAccount {
  user_id: string
  user_name: string
  first_name: string
  last_name: string
}

export const RawAccount = raw({
  user_id: { type: String },
  user_name: { type: String },
  first_name: { type: String },
  last_name: { type: String },
})
