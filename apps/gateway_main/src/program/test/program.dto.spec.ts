import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"
import { DTOCreateProgram, DTOProgramNotification } from "../program.dto.create"
import { DTOUpdateProgram } from "../program.dto.update"
import { ProgramTimeZone } from "@database/schema/program.schema"

describe("Program DTO Validation", () => {
    describe("DTOCreateProgram", () => {
        it("should pass validation with valid data", async () => {
            const dto = plainToInstance(DTOCreateProgram, {
                name: "TestProgram",
                desc: "Test Description",
                program_time_zone: ProgramTimeZone.WIB,
                start_period: "2026-01-01",
                end_period: "2026-12-31",
            })
            const errors = await validate(dto)
            expect(errors.length).toBe(0)
        })

        it("should fail validation when name is missing", async () => {
            const dto = plainToInstance(DTOCreateProgram, {
                desc: "Test Description",
                program_time_zone: ProgramTimeZone.WIB,
                start_period: "2026-01-01",
                end_period: "2026-12-31",
            })
            const errors = await validate(dto)
            expect(errors.length).toBeGreaterThan(0)
            expect(errors[0].property).toBe("name")
        })

        it("should fail validation when desc is missing", async () => {
            const dto = plainToInstance(DTOCreateProgram, {
                name: "TestProgram",
                program_time_zone: ProgramTimeZone.WIB,
                start_period: "2026-01-01",
                end_period: "2026-12-31",
            })
            const errors = await validate(dto)
            expect(errors.length).toBeGreaterThan(0)
            expect(errors[0].property).toBe("desc")
        })

        it("should fail validation with invalid program_time_zone", async () => {
            const dto = plainToInstance(DTOCreateProgram, {
                name: "TestProgram",
                desc: "Test Description",
                program_time_zone: "INVALID",
                start_period: "2026-01-01",
                end_period: "2026-12-31",
            })
            const errors = await validate(dto)
            expect(errors.length).toBeGreaterThan(0)
            expect(errors.some(e => e.property === "program_time_zone")).toBe(true)
        })

        it("should pass validation with optional fields", async () => {
            const dto = plainToInstance(DTOCreateProgram, {
                name: "TestProgram",
                desc: "Test Description",
                program_time_zone: ProgramTimeZone.WITA,
                start_period: "2026-01-01",
                end_period: "2026-12-31",
                keyword_registration: "TESTREG",
                point_registration: 100,
                whitelist_counter: true,
                is_draft: false,
                is_stoped: false,
                need_review_after_edit: true,
            })
            const errors = await validate(dto)
            expect(errors.length).toBe(0)
        })

        it("should pass validation with program_notification array", async () => {
            const dto = plainToInstance(DTOCreateProgram, {
                name: "TestProgram",
                desc: "Test Description",
                program_time_zone: ProgramTimeZone.WIT,
                start_period: "2026-01-01",
                end_period: "2026-12-31",
                program_notification: [
                    {
                        template: "welcome",
                        template_content: "Welcome message",
                    },
                ],
            })
            const errors = await validate(dto)
            expect(errors.length).toBe(0)
        })
    })

    describe("DTOUpdateProgram", () => {
        it("should pass validation with partial data", async () => {
            const dto = plainToInstance(DTOUpdateProgram, {
                name: "UpdatedProgram",
            })
            const errors = await validate(dto)
            expect(errors.length).toBe(0)
        })

        it("should pass validation with empty object", async () => {
            const dto = plainToInstance(DTOUpdateProgram, {})
            const errors = await validate(dto)
            expect(errors.length).toBe(0)
        })

        it("should fail validation with invalid program_time_zone", async () => {
            const dto = plainToInstance(DTOUpdateProgram, {
                program_time_zone: "INVALID",
            })
            const errors = await validate(dto)
            expect(errors.length).toBeGreaterThan(0)
        })
    })
})
