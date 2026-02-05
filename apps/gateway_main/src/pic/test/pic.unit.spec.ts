import { Test, TestingModule } from "@nestjs/testing"
import { PICService } from "../pic.service"
import { REPOSITORY_PIC } from "@shared/repository"
import { mockPIC, mockPICRepository } from "./mock/pic.mock"
import { DTOCreatePIC } from "../pic.dto.create"
import { DTOUpdatePIC } from "../pic.dto.update"
import { DTOPrimeTableQuery } from "../pic.dto.prime"

describe("PIC Service", () => {
    let picService: PICService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PICService,
                {
                    provide: REPOSITORY_PIC,
                    useValue: mockPICRepository,
                },
            ],
        }).compile()

        picService = module.get<PICService>(PICService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("Service Initialization", () => {
        it("should be defined", () => {
            expect(picService).toBeDefined()
        })
    })

    describe("all()", () => {
        it("should call repository findAll", async () => {
            await picService.all()
            expect(mockPICRepository.findAll).toHaveBeenCalled()
        })

        it("should return array of PIC", async () => {
            const result = await picService.all()
            expect(Array.isArray(result)).toBe(true)
            expect(result[0]).toHaveProperty("name")
            expect(result[0]).toHaveProperty("msisdn")
            expect(result[0]).toHaveProperty("email")
        })
    })

    describe("allPrime()", () => {
        const mockPICArray = [
            mockPIC("JohnDoe", "08123456789012", "john@example.com"),
            mockPIC("JaneDoe", "08123456789013", "jane@example.com"),
            mockPIC("BobSmith", "08123456789014", "bob@example.com"),
        ]

        beforeEach(() => {
            // Mock to handle both array and PrimeData returns based on withPagination
            mockPICRepository.findAll.mockImplementation((options: any) => {
                if (options?.withPagination) {
                    // Return PrimeData format
                    const limit = options.limit || 10
                    const offset = options.offset || 0
                    return Promise.resolve({
                        data: mockPICArray.slice(offset, offset + limit),
                        totalRecords: mockPICArray.length,
                        first: offset,
                        rows: limit,
                        totalPages: Math.ceil(mockPICArray.length / limit),
                        currentPage: Math.floor(offset / limit) + 1,
                    })
                }
                // Return array (for globalFilter case)
                return Promise.resolve(mockPICArray)
            })
        })

        it("should return paginated data with default values", async () => {
            const query: DTOPrimeTableQuery = {}
            const result = await picService.allPrime(query)

            expect(result).toHaveProperty("data")
            expect(result).toHaveProperty("totalRecords", 3)
            expect(result).toHaveProperty("first", 0)
            expect(result).toHaveProperty("rows", 10)
            expect(result).toHaveProperty("totalPages", 1)
            expect(result).toHaveProperty("currentPage", 1)
        })


        it("should apply pagination correctly", async () => {
            const query: DTOPrimeTableQuery = { first: 0, rows: 2 }
            const result = await picService.allPrime(query)

            expect(result.data.length).toBe(2)
            expect(result.totalRecords).toBe(3)
            expect(result.totalPages).toBe(2)
        })

        it("should apply pagination for second page", async () => {
            const query: DTOPrimeTableQuery = { first: 2, rows: 2 }
            const result = await picService.allPrime(query)

            expect(result.data.length).toBe(1)
            expect(result.currentPage).toBe(2)
        })

        it("should apply sorting with sortField", async () => {
            const query: DTOPrimeTableQuery = { sortField: "name", sortOrder: 1 }
            await picService.allPrime(query)

            expect(mockPICRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    orderBy: { field: "name", direction: "ASC" },
                }),
            )
        })

        it("should apply DESC sorting when sortOrder is -1", async () => {
            const query: DTOPrimeTableQuery = { sortField: "email", sortOrder: -1 }
            await picService.allPrime(query)

            expect(mockPICRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    orderBy: { field: "email", direction: "DESC" },
                }),
            )
        })

        it("should filter by globalFilter on name", async () => {
            const query: DTOPrimeTableQuery = { globalFilter: "john" }
            const result = await picService.allPrime(query)

            expect(result.data.length).toBe(1)
            expect(result.data[0].name).toBe("JohnDoe")
            expect(result.totalRecords).toBe(1)
        })

        it("should filter by globalFilter on email", async () => {
            const query: DTOPrimeTableQuery = { globalFilter: "jane@" }
            const result = await picService.allPrime(query)

            expect(result.data.length).toBe(1)
            expect(result.data[0].email).toBe("jane@example.com")
        })

        it("should filter by globalFilter on msisdn", async () => {
            const query: DTOPrimeTableQuery = { globalFilter: "08123456789014" }
            const result = await picService.allPrime(query)

            expect(result.data.length).toBe(1)
            expect(result.data[0].name).toBe("BobSmith")
        })

        it("should return empty when globalFilter matches nothing", async () => {
            const query: DTOPrimeTableQuery = { globalFilter: "nonexistent" }
            const result = await picService.allPrime(query)

            expect(result.data.length).toBe(0)
            expect(result.totalRecords).toBe(0)
        })
    })

    describe("create()", () => {
        const createPayload: DTOCreatePIC = {
            name: "JohnDoe",
            msisdn: "08123456789012",
            email: "john@example.com",
        }
        const createdBy = { user_id: "user-123", user_name: "admin" }

        it("should call repository create with correct parameters", async () => {
            await picService.create(createPayload, createdBy)
            expect(mockPICRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: createPayload.name,
                    msisdn: createPayload.msisdn,
                    email: createPayload.email,
                    created_by: createdBy,
                }),
                `pic::${createPayload.msisdn}`,
            )
        })
    })

    describe("update()", () => {
        const updatePayload: DTOUpdatePIC = {
            name: "JaneDoe",
            email: "jane@example.com",
        }

        it("should call repository findOne and update with merged data", async () => {
            const id = "pic::08123456789012"
            await picService.update(id, updatePayload)

            // Should first fetch existing data
            expect(mockPICRepository.findOne).toHaveBeenCalledWith(id)

            // Should update with merged data (timestamps handled by repository)
            expect(mockPICRepository.update).toHaveBeenCalledWith(
                id,
                expect.objectContaining({
                    name: updatePayload.name,
                    email: updatePayload.email,
                }),
            )
        })
    })

    describe("remove()", () => {
        it("should call repository delete with correct id", async () => {
            const id = "pic::08123456789012"
            await picService.remove(id)
            expect(mockPICRepository.delete).toHaveBeenCalledWith(id)
        })
    })

    describe("removeSoft()", () => {
        it("should call repository deleteSoft with correct id", async () => {
            const id = "pic::08123456789012"
            await picService.removeSoft(id)
            expect(mockPICRepository.deleteSoft).toHaveBeenCalledWith(id)
        })
    })
})

