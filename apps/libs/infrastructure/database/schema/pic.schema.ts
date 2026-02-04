/**
 * PIC (Person In Charge) collection is used to store PIC data
 *
 * @property { string } name - Name of PIC (min 6 chars, alphabet only)
 * @property { string } msisdn - Phone number (min 11, max 14 chars)
 * @property { string } email - Email address
 * @property { any } created_by - User who created this record
 * @property { Date } created_at - Timestamp when record was created
 * @property { Date } updated_at - Timestamp when record was last updated
 * @property { Date | null } deleted_at - Timestamp when record was deleted (soft delete)
 */
export class PIC {
    name: string
    msisdn: string
    email: string
    created_by: any
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}
