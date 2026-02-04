import { Test, TestingModule } from "@nestjs/testing"
import { PICService } from "../pic.service"
import { REPOSITORY_PIC } from "@shared/repository"
import { mockPIC, mockPICRepository } from "./mock/pic.mock"
import { DTOCreatePIC } from "../pic.dto.create"
import { DTOUpdatePIC } from "../pic.dto.update"

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

        it("should call repository update with correct parameters", async () => {
            const id = "pic::08123456789012"
            await picService.update(id, updatePayload)
            expect(mockPICRepository.update).toHaveBeenCalledWith(id, updatePayload)
        })
    })

    describe("remove()", () => {
        it("should call repository delete with correct id", async () => {
            const id = "pic::08123456789012"
            await picService.remove(id)
            expect(mockPICRepository.delete).toHaveBeenCalledWith(id)
        })
    })
})
