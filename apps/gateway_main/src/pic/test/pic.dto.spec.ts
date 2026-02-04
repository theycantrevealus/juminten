import { validate } from "class-validator"
import { DTOCreatePIC } from "../pic.dto.create"
import { DTOUpdatePIC } from "../pic.dto.update"

describe("PIC DTO Validation", () => {
    describe("DTOCreatePIC", () => {
        it("should pass validation with valid data", async () => {
            const dto = new DTOCreatePIC()
            dto.name = "JohnDoe"
            dto.msisdn = "08123456789012"
            dto.email = "john@example.com"

            const errors = await validate(dto)
            expect(errors.length).toBe(0)
        })

        describe("name validation", () => {
            it("should fail when name is less than 6 characters", async () => {
                const dto = new DTOCreatePIC()
                dto.name = "John"
                dto.msisdn = "08123456789012"
                dto.email = "john@example.com"

                const errors = await validate(dto)
                expect(errors.length).toBeGreaterThan(0)
                expect(errors[0].property).toBe("name")
            })

            it("should fail when name contains numbers", async () => {
                const dto = new DTOCreatePIC()
                dto.name = "John123"
                dto.msisdn = "08123456789012"
                dto.email = "john@example.com"

                const errors = await validate(dto)
                expect(errors.length).toBeGreaterThan(0)
                expect(errors[0].property).toBe("name")
            })

            it("should fail when name is empty", async () => {
                const dto = new DTOCreatePIC()
                dto.name = ""
                dto.msisdn = "08123456789012"
                dto.email = "john@example.com"

                const errors = await validate(dto)
                expect(errors.length).toBeGreaterThan(0)
            })
        })

        describe("msisdn validation", () => {
            it("should fail when msisdn is less than 11 characters", async () => {
                const dto = new DTOCreatePIC()
                dto.name = "JohnDoe"
                dto.msisdn = "0812345678"
                dto.email = "john@example.com"

                const errors = await validate(dto)
                expect(errors.length).toBeGreaterThan(0)
                expect(errors[0].property).toBe("msisdn")
            })

            it("should fail when msisdn is more than 14 characters", async () => {
                const dto = new DTOCreatePIC()
                dto.name = "JohnDoe"
                dto.msisdn = "081234567890123"
                dto.email = "john@example.com"

                const errors = await validate(dto)
                expect(errors.length).toBeGreaterThan(0)
                expect(errors[0].property).toBe("msisdn")
            })
        })

        describe("email validation", () => {
            it("should fail when email format is invalid", async () => {
                const dto = new DTOCreatePIC()
                dto.name = "JohnDoe"
                dto.msisdn = "08123456789012"
                dto.email = "invalid-email"

                const errors = await validate(dto)
                expect(errors.length).toBeGreaterThan(0)
                expect(errors[0].property).toBe("email")
            })

            it("should fail when email is less than 8 characters", async () => {
                const dto = new DTOCreatePIC()
                dto.name = "JohnDoe"
                dto.msisdn = "08123456789012"
                dto.email = "a@b.com"

                const errors = await validate(dto)
                expect(errors.length).toBeGreaterThan(0)
                expect(errors[0].property).toBe("email")
            })
        })
    })

    describe("DTOUpdatePIC", () => {
        it("should pass validation with empty object (all optional)", async () => {
            const dto = new DTOUpdatePIC()

            const errors = await validate(dto)
            expect(errors.length).toBe(0)
        })

        it("should pass validation with partial data", async () => {
            const dto = new DTOUpdatePIC()
            dto.name = "JaneDoe"

            const errors = await validate(dto)
            expect(errors.length).toBe(0)
        })

        it("should fail validation when provided name is invalid", async () => {
            const dto = new DTOUpdatePIC()
            dto.name = "Jane123"

            const errors = await validate(dto)
            expect(errors.length).toBeGreaterThan(0)
            expect(errors[0].property).toBe("name")
        })
    })
})
