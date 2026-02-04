/**
 * This class is only for extend with other class to provide the timestamp
 *
 * @property { Date } created_at - Data creation date
 * @property { Date } updated_at - Data last update date
 * @property { Date } deleted_at - Data delete date
 */
export class Timestamp {
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date | null

  constructor() {
    this.created_at = new Date()
    this.updated_at = new Date()
    this.deleted_at = null
  }
}
