import { Timestamp } from "./timestamp.schema"

/**
 * PIC (Person In Charge) collection is used to store PIC data
 *
 * @property { string } name - Name of PIC (min 6 chars, alphabet only)
 * @property { string } msisdn - Phone number (min 11, max 14 chars)
 * @property { string } email - Email address
 * @property { any } created_by - User who created this record
 */
export class PIC extends Timestamp {
    name: string
    msisdn: string
    email: string
    created_by: any

    static create(data: Partial<PIC>) {
        return Object.assign(new PIC(), data)
    }
}
