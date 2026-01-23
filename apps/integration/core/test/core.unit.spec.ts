import { Test, TestingModule } from "@nestjs/testing"
import { CoreService } from "../service"
import { HttpService } from "@nestjs/axios"
import { ConfigService } from "@nestjs/config"
import { of } from "rxjs"

describe("E2E Core Module Test", () => {
  let coreService: CoreService
  let httpService: HttpService

  const mockAxiosRef = {
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  }

  const mockHttpService = {
    axiosRef: mockAxiosRef,
    get: jest.fn(),
    post: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: () => jest.fn().mockResolvedValue("Test"),
            set: () => jest.fn().mockResolvedValue("Test"),
          },
        },
        {
          provide: "IntegrationCore",
          useValue: {
            log: jest.fn(),
            warn: jest.fn(),
            verbose: jest.fn(),
            error: jest.fn(),
          },
        },
        { provide: HttpService, useValue: mockHttpService },
        CoreService,
      ],
    }).compile()

    coreService = module.get<CoreService>(CoreService)
    httpService = module.get(HttpService)
  })

  it("should provide service once initialize", () => {
    expect(coreService).toBeDefined()
  })

  it("should register axios interceptors", () => {
    expect(mockAxiosRef.interceptors.request.use).toHaveBeenCalled()
    expect(mockAxiosRef.interceptors.response.use).toHaveBeenCalled()
  })

  it("get() should return response.data", async () => {
    mockHttpService.get.mockReturnValue(of({ data: { foo: "bar" } }))

    const result = await coreService.get("/test")

    expect(result).toEqual({ foo: "bar" })
  })

  it("post() should return response.data", async () => {
    mockHttpService.post.mockReturnValue(of({ data: { ok: true } }))

    const result = await coreService.post("/test", {})

    expect(result).toEqual({ ok: true })
  })
})
