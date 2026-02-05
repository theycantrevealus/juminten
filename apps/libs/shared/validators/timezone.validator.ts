import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator"
import { TIMEZONE_OFFSETS, TimezoneCode } from "../timezone.util"

/**
 * Interface for objects that contain program_time_zone
 */
interface WithProgramTimezone {
    program_time_zone?: TimezoneCode
}

/**
 * Custom validator untuk memastikan date offset sesuai dengan program_time_zone
 *
 * Usage in DTO:
 * @Validate(TimezoneOffsetValidator)
 * start_period: string
 */
@ValidatorConstraint({ name: "timezoneOffset", async: false })
export class TimezoneOffsetValidator implements ValidatorConstraintInterface {
    validate(dateString: string, args: ValidationArguments): boolean {
        const object = args.object as WithProgramTimezone

        // Skip validation if no timezone or date
        if (!object.program_time_zone || !dateString) {
            return true
        }

        // Check if timezone is valid
        if (!(object.program_time_zone in TIMEZONE_OFFSETS)) {
            return false
        }

        const expectedOffset = TIMEZONE_OFFSETS[object.program_time_zone]
        return dateString.includes(expectedOffset)
    }

    defaultMessage(args: ValidationArguments): string {
        const object = args.object as WithProgramTimezone
        const timezone = object.program_time_zone

        if (!timezone || !(timezone in TIMEZONE_OFFSETS)) {
            return `Invalid program_time_zone: ${timezone}`
        }

        const expectedOffset = TIMEZONE_OFFSETS[timezone]
        return `Date timezone offset must be ${expectedOffset} for ${timezone}. Example: 2026-02-05T09:00:00.000${expectedOffset}`
    }
}
