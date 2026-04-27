import { Timestamp } from "./timestamp.schema";

/**
 * Role collection is used for user role master data
 *
 * @property { string } role_id - Unique role identifier
 * @property { string } name - Role name
 * @property { string } desc - Role description
 * @property { [] } authorizes - Authorization object
 * @property { string } status - Role status, enable or disable (using string)
 */
export class Role extends Timestamp {
  role_id!: string
  name!: string
  desc!: string
  authorizes!: []
  status!: string

  static create(data: Partial<Role>) {
    return Object.assign(new Role(), data)
  }
}