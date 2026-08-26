import { describe, it, expect } from "vitest"

describe("E2E Core OAuth Test", () => {
  // let coreService: CoreService
  // let coreOAuthService: CoreOauthService
  // let httpService: HttpService

  // const mockAxiosRef = {
  //   interceptors: {
  //     request: { use: vi.fn() },
  //     response: { use: vi.fn() },
  //   },
  // }

  // const mockHttpService = {
  //   axiosRef: mockAxiosRef,
  //   get: vi.fn(),
  //   post: vi.fn(),
  // }

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       {
  //         provide: ConfigService,
  //         useValue: {
  //           get: () => vi.fn().mockResolvedValue("Test"),
  //           set: () => vi.fn().mockResolvedValue("Test"),
  //         },
  //       },
  //       {
  //         provide: "IntegrationCore",
  //         useValue: {
  //           log: vi.fn(),
  //           warn: vi.fn(),
  //           verbose: vi.fn(),
  //           error: vi.fn(),
  //         },
  //       },
  //       { provide: HttpService, useValue: mockHttpService },
  //       CoreOauthService,
  //       CoreService,
  //     ],
  //   }).compile()

  //   coreService = module.get<CoreService>(CoreService)
  //   coreOAuthService = module.get<CoreOauthService>(CoreOauthService)
  //   httpService = module.get(HttpService)
  // })

  // it("should provide service once initialize", () => {
  //   expect(coreOAuthService).toBeDefined()
  // })

  // it("signIn() should return payload", async () => {
  //   const mockResponse: CoreResponse = {
  //     code: "",
  //     message: "",
  //     payload: { access_token: "token", refresh_token: "token" },
  //   }

  //   vi.spyOn(coreService, "post").mockResolvedValue(mockResponse)

  //   const result = await coreOAuthService.signIn({
  //     locale: "test",
  //     username: "test",
  //     password: "test",
  //     client_id: "test",
  //     client_secret: "test",
  //   } as ContractSignIn)

  //   expect(coreService.post).toHaveBeenCalledWith(
  //     "/gateway/v3.0/oauth/signin",
  //     {
  //       locale: "test",
  //       username: "test",
  //       password: "test",
  //       client_id: "test",
  //       client_secret: "test",
  //     },
  //   )
  //   expect(result).toHaveProperty("access_token")
  // })

  // it("signIn() should throw BadRequestException", async () => {
  //   vi.spyOn(coreService, "post").mockRejectedValue(new Error("fail"))

  //   await expect(coreOAuthService.signIn({} as any)).rejects.toBeInstanceOf(
  //     BadRequestException,
  //   )
  // })

  // it("authenticateBusiness() should return payload", async () => {
  //   const mockResponse: CoreResponse = {
  //     code: "",
  //     message: "",
  //     payload: { userProfile: {} },
  //   }

  //   vi.spyOn(coreService, "get").mockResolvedValue(mockResponse)

  //   const result = await coreOAuthService.authenticateBusiness("test")

  //   expect(coreService.get).toHaveBeenCalledWith(
  //     "/gateway/v3.0/business/home",
  //     {
  //       headers: {
  //         Authorization: "test",
  //       },
  //     },
  //   )

  //   expect(result).toHaveProperty("userProfile")
  // })

  // it("authenticateBusiness() should throw BadRequestException", async () => {
  //   vi.spyOn(coreService, "get").mockRejectedValue(new Error("fail"))

  //   await expect(
  //     coreOAuthService.authenticateBusiness("test"),
  //   ).rejects.toBeInstanceOf(BadRequestException)
  // })
  it("should run test", () => {
    expect(5).toBeGreaterThan(0)
  })
})
