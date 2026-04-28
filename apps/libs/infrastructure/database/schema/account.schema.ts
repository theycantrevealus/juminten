import { Timestamp } from "./timestamp.schema"

/**
 * Account collection is used to store system user data
 * such as identity, role mapping, hierarchy, and location assignment.
 *
 * @property { string } user_id - Unique user identifier
 * @property { string } [core_role] - Core role identifier
 * @property { string } user_name - Username for login or display
 * @property { string } first_name - User first name
 * @property { string } last_name - User last name
 * @property { string } job_title - User job title
 * @property { string } job_level - User job level
 * @property { string } phone - User phone number
 * @property { string } email - User email address
 * @property { Date } birthdate - User birth date
 * @property { string } status - Account status
 * @property { string } line_id - LINE messenger identifier
 * @property { "merchant" | "business" } type - Account type
 * @property { string } role - Role object identifier
 * @property { string } superior_local - Local supervisor account reference
 * @property { string } superior_hq - Headquarter supervisor account reference
 * @property { string } manager_id - Manager identifier
 * @property { string } [agent] - Agent code or identifier
 * @property { string } [legacy_user_id] - Legacy system user identifier
 * @property { string[] } account_location - Assigned account locations
 */
export class Account extends Timestamp {
  user_id!: string
  core_role?: string
  user_name!: string
  first_name!: string
  last_name!: string
  job_title!: string
  job_level!: string
  phone!: string
  email!: string
  birthdate!: string
  status!: string
  line_id!: string
  type!: string // "merchant" | "business"
  role!: string // object id
  superior_local!: string // object id ref
  superior_hq!: string // object id ref
  manager_id!: string
  agent?: string
  legacy_user_id?: string
  account_location: string[] = []

  static create(data: Partial<Account>) {
    return Object.assign(new Account(), data)
  }
}
