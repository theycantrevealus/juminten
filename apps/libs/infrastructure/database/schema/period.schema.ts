import { Timestamp } from "./timestamp.schema"

/**
 * This class extends Timestamp and provides period fields.
 * Use this when your schema needs both timestamp (created_at, updated_at, deleted_at)
 * and period (start_period, end_period) fields.
 *
 * Period dates are stored as ISO 8601 strings with timezone offset
 * to preserve timezone information (e.g., "2026-02-05T09:20:00.000+07:00")
 *
 * @extends Timestamp
 * @property { string } start_period - Period start date (ISO 8601 with timezone)
 * @property { string } end_period - Period end date (ISO 8601 with timezone)
 */
export class Period extends Timestamp {
    start_period?: string
    end_period?: string

    constructor() {
        super()
        this.start_period = null
        this.end_period = null
    }
}
