import { Test, TestingModule } from "@nestjs/testing"
import { ProgramService } from "../program.service"
import { REPOSITORY_PROGRAM } from "@shared/repository"
import { mockProgram, mockProgramRepository } from "./mock/program.mock"
import { DTOCreateProgram } from "../program.dto.create"
import { DTOUpdateProgram } from "../program.dto.update"
import { DTOPrimeTableQuery } from "../program.dto.prime"
import { ProgramTimeZone, Program } from "@database/schema/program.schema"

describe("Program Service", () => {
    let programService: ProgramService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProgramService,
                {
                    provide: REPOSITORY_PROGRAM,
                    useValue: mockProgramRepository,
                },
            ],
        }).compile()

        programService = module.get<ProgramService>(ProgramService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("Service Initialization", () => {
        it("should be defined", () => {
            expect(programService).toBeDefined()
        })
    })

    describe("all()", () => {
        it("should call repository findAll", async () => {
            await programService.all()
            expect(mockProgramRepository.findAll).toHaveBeenCalled()
        })

        it("should return array of Program", async () => {
            const result = await programService.all()
            expect(Array.isArray(result)).toBe(true)
            expect(result[0]).toHaveProperty("name")
            expect(result[0]).toHaveProperty("desc")
            expect(result[0]).toHaveProperty("program_time_zone")
        })

        it("should transform program response with timezone", async () => {
            const result = await programService.all()
            expect(result[0]).toHaveProperty("start_period")
            expect(result[0]).toHaveProperty("end_period")
        })

        it("should handle program without valid timezone gracefully", async () => {
            const programWithoutTimezone: Program = {
                ...mockProgram,
                program_time_zone: null as any,
            }
            mockProgramRepository.findAll.mockResolvedValueOnce([programWithoutTimezone])

            const result = await programService.all()
            expect(result).toBeDefined()
            expect(result.length).toBe(1)
        })

        it("should handle program without start_period/end_period gracefully", async () => {
            const programWithoutDates: Program = {
                ...mockProgram,
                start_period: null,
                end_period: null,
            }
            mockProgramRepository.findAll.mockResolvedValueOnce([programWithoutDates])

            const result = await programService.all()
            expect(result).toBeDefined()
            expect(result[0].start_period).toBeNull()
            expect(result[0].end_period).toBeNull()
        })

        it("should handle empty array from repository", async () => {
            mockProgramRepository.findAll.mockResolvedValueOnce([])

            const result = await programService.all()
            expect(result).toEqual([])
        })
    })

    describe("allPrime()", () => {
        const mockProgramArray: Program[] = [
            {
                ...mockProgram,
                name: "ProgramA",
                desc: "Description A",
                keyword_registration: "REGA",
            },
            {
                ...mockProgram,
                name: "ProgramB",
                desc: "Description B",
                keyword_registration: "REGB",
            },
            {
                ...mockProgram,
                name: "ProgramC",
                desc: "Description C",
                keyword_registration: "REGC",
            },
        ]

        beforeEach(() => {
            mockProgramRepository.findAll.mockResolvedValue(mockProgramArray)
        })

        it("should return paginated data with default values", async () => {
            const query: DTOPrimeTableQuery = {}
            const result = await programService.allPrime(query)

            expect(result).toHaveProperty("data")
            expect(result).toHaveProperty("totalRecords", 3)
            expect(result).toHaveProperty("first", 0)
            expect(result).toHaveProperty("rows", 10)
            expect(result).toHaveProperty("totalPages", 1)
            expect(result).toHaveProperty("currentPage", 1)
            expect(result).toHaveProperty("hasNextPage", false)
            expect(result).toHaveProperty("hasPrevPage", false)
        })

        it("should apply pagination correctly", async () => {
            const query: DTOPrimeTableQuery = { first: 0, rows: 2 }
            const result = await programService.allPrime(query)

            expect(result.data.length).toBe(2)
            expect(result.totalRecords).toBe(3)
            expect(result.totalPages).toBe(2)
            expect(result.hasNextPage).toBe(true)
            expect(result.hasPrevPage).toBe(false)
        })

        it("should apply pagination for second page", async () => {
            const query: DTOPrimeTableQuery = { first: 2, rows: 2 }
            const result = await programService.allPrime(query)

            expect(result.data.length).toBe(1)
            expect(result.currentPage).toBe(2)
            expect(result.hasNextPage).toBe(false)
            expect(result.hasPrevPage).toBe(true)
        })

        it("should apply sorting with sortField", async () => {
            const query: DTOPrimeTableQuery = { sortField: "name", sortOrder: 1 }
            await programService.allPrime(query)

            expect(mockProgramRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    orderBy: { field: "name", direction: "ASC" },
                }),
            )
        })

        it("should apply DESC sorting when sortOrder is -1", async () => {
            const query: DTOPrimeTableQuery = { sortField: "desc", sortOrder: -1 }
            await programService.allPrime(query)

            expect(mockProgramRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    orderBy: { field: "desc", direction: "DESC" },
                }),
            )
        })

        it("should filter by globalFilter on name", async () => {
            const query: DTOPrimeTableQuery = { globalFilter: "programa" }
            const result = await programService.allPrime(query)

            expect(result.data.length).toBe(1)
            expect(result.data[0].name).toBe("ProgramA")
            expect(result.totalRecords).toBe(1)
        })

        it("should filter by globalFilter on desc", async () => {
            const query: DTOPrimeTableQuery = { globalFilter: "Description B" }
            const result = await programService.allPrime(query)

            expect(result.data.length).toBe(1)
            expect(result.data[0].desc).toBe("Description B")
        })

        it("should filter by globalFilter on keyword_registration", async () => {
            const query: DTOPrimeTableQuery = { globalFilter: "REGC" }
            const result = await programService.allPrime(query)

            expect(result.data.length).toBe(1)
            expect(result.data[0].keyword_registration).toBe("REGC")
        })

        it("should return empty when globalFilter matches nothing", async () => {
            const query: DTOPrimeTableQuery = { globalFilter: "nonexistent" }
            const result = await programService.allPrime(query)

            expect(result.data.length).toBe(0)
            expect(result.totalRecords).toBe(0)
        })

        it("should transform timezone in response", async () => {
            const query: DTOPrimeTableQuery = {}
            const result = await programService.allPrime(query)

            expect(result.data[0]).toHaveProperty("start_period")
            expect(result.data[0]).toHaveProperty("end_period")
            expect(result.data[0]).toHaveProperty("program_time_zone")
        })
    })

    describe("create()", () => {
        const createPayload: DTOCreateProgram = {
            name: "NewProgram",
            desc: "New Description",
            program_time_zone: ProgramTimeZone.WIB,
            start_period: "2026-01-01T00:00:00.000+07:00",
            end_period: "2026-12-31T23:59:59.000+07:00",
        }
        const createdBy = { user_profile: { user_id: "user-123" }, authorizes: [] }

        it("should call repository create with correct parameters", async () => {
            await programService.create(createPayload, createdBy)
            expect(mockProgramRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: createPayload.name,
                    desc: createPayload.desc,
                    program_time_zone: createPayload.program_time_zone,
                    created_by: createdBy,
                }),
                expect.stringContaining("program::"),
            )
        })
    })

    describe("update()", () => {
        const updatePayload: DTOUpdateProgram = {
            name: "UpdatedProgram",
            desc: "Updated Description",
        }

        it("should call repository findOne and update with merged data", async () => {
            const id = "program::testprogram"
            await programService.update(id, updatePayload)

            // Should first fetch existing data
            expect(mockProgramRepository.findOne).toHaveBeenCalledWith(id)

            // Should update with merged data (timestamps handled by repository)
            expect(mockProgramRepository.update).toHaveBeenCalledWith(
                id,
                expect.objectContaining({
                    name: updatePayload.name,
                    desc: updatePayload.desc,
                }),
            )
        })
    })

    describe("remove()", () => {
        it("should call repository delete with correct id", async () => {
            const id = "program::testprogram"
            await programService.remove(id)
            expect(mockProgramRepository.delete).toHaveBeenCalledWith(id)
        })
    })

    describe("removeSoft()", () => {
        it("should call repository deleteSoft with correct id", async () => {
            const id = "program::testprogram"
            await programService.removeSoft(id)
            expect(mockProgramRepository.deleteSoft).toHaveBeenCalledWith(id)
        })
    })
})

