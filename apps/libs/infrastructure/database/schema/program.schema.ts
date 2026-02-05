import { Period } from "./period.schema"
/**
 * Enum untuk timezone program
 */
export enum ProgramTimeZone {
    WIB = "WIB",
    WITA = "WITA",
    WIT = "WIT",
}

/**
 * Interface untuk program notification
 */
export interface ProgramNotification {
    template: string
    template_content: string
}

/**
 * Program collection is used to store program data
 *
 * @property { string } name - Name of program (required, unique)
 * @property { string } desc - Description of program (required)
 * @property { ProgramTimeZone } program_time_zone - Timezone of program (WIB/WITA/WIT)
 * @property { string } keyword_registration - Keyword for registration
 * @property { number } point_registration - Point for registration (default 0)
 * @property { boolean } whitelist_counter - Enable whitelist counter
 * @property { ProgramNotification[] } program_notification - Array of notifications
 * @property { boolean } is_draft - Is draft (default FALSE)
 * @property { boolean } is_stoped - Is stopped (default FALSE)
 * @property { boolean } need_review_after_edit - Need review after edit (default FALSE)
 * @property { any } created_by - User who created this record
 */
export class Program extends Period {
    name: string
    desc: string
    program_time_zone: ProgramTimeZone
    keyword_registration?: string
    point_registration: number
    whitelist_counter?: boolean
    program_notification?: ProgramNotification[]
    is_draft: boolean
    is_stoped: boolean
    need_review_after_edit: boolean
    created_by: any

    static create(data: Partial<Program>): Program {
        const instance = Object.assign(new Program(), data)
        instance.point_registration = data.point_registration ?? 0
        instance.is_draft = data.is_draft ?? false
        instance.is_stoped = data.is_stoped ?? false
        instance.need_review_after_edit = data.need_review_after_edit ?? false
        return instance
    }
}
