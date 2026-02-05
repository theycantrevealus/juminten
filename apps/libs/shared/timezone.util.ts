/**
 * Timezone Utility Functions
 *
 * Utility murni untuk timezone operations.
 * Digunakan oleh Service layer untuk business logic.
 */

/**
 * Timezone offset mapping untuk Indonesia
 */
export const TIMEZONE_OFFSETS = {
    WIB: "+07:00",
    WITA: "+08:00",
    WIT: "+09:00",
} as const

export type TimezoneCode = keyof typeof TIMEZONE_OFFSETS

/**
 * Get timezone offset hours for calculations
 */
export const TIMEZONE_HOURS = {
    WIB: 7,
    WITA: 8,
    WIT: 9,
} as const

/**
 * Format date dengan timezone offset yang benar
 * @param date - Date object atau ISO string
 * @param timezone - Timezone code (WIB, WITA, WIT)
 * @returns ISO string dengan offset yang benar (e.g., 2026-02-05T09:20:00.000+07:00)
 */
export function formatDateWithTimezone(
    date: Date | string,
    timezone: TimezoneCode,
): string {
    const dateObj = typeof date === "string" ? new Date(date) : date

    if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date provided")
    }

    const offsetHours = TIMEZONE_HOURS[timezone]
    const offsetMs = offsetHours * 60 * 60 * 1000

    // Adjust to local timezone
    const localTime = new Date(dateObj.getTime() + offsetMs)

    // Format components
    const year = localTime.getUTCFullYear()
    const month = String(localTime.getUTCMonth() + 1).padStart(2, "0")
    const day = String(localTime.getUTCDate()).padStart(2, "0")
    const hours = String(localTime.getUTCHours()).padStart(2, "0")
    const minutes = String(localTime.getUTCMinutes()).padStart(2, "0")
    const seconds = String(localTime.getUTCSeconds()).padStart(2, "0")
    const ms = String(localTime.getUTCMilliseconds()).padStart(3, "0")

    const offset = TIMEZONE_OFFSETS[timezone]

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}${offset}`
}

/**
 * Validate bahwa date string memiliki offset yang sesuai dengan timezone
 * @param dateString - ISO date string dengan offset
 * @param timezone - Expected timezone code
 * @returns true jika offset valid
 */
export function isValidTimezoneOffset(
    dateString: string,
    timezone: TimezoneCode,
): boolean {
    if (!dateString || !timezone) {
        return true // Skip validation if empty
    }

    const expectedOffset = TIMEZONE_OFFSETS[timezone]
    return dateString.includes(expectedOffset)
}

/**
 * Extract timezone offset dari ISO string
 * @param dateString - ISO date string
 * @returns Offset string (e.g., "+07:00") atau null jika tidak ditemukan
 */
export function extractTimezoneOffset(dateString: string): string | null {
    if (!dateString) return null

    const match = dateString.match(/([+-]\d{2}:\d{2})$/)
    return match ? match[1] : null
}

/**
 * Parse ISO string dengan timezone ke Date object
 * @param dateString - ISO date string dengan offset
 * @returns Date object
 */
export function parseTimezoneDate(dateString: string): Date {
    return new Date(dateString)
}

/**
 * Check if timezone code is valid
 * @param timezone - Timezone code to validate
 * @returns true if valid timezone code
 */
export function isValidTimezoneCode(
    timezone: string,
): timezone is TimezoneCode {
    return timezone in TIMEZONE_OFFSETS
}
