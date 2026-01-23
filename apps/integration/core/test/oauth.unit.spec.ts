import { Test, TestingModule } from "@nestjs/testing"
import { CoreService } from "../service"
import { CoreOauthService } from "../oauth.service"
import { HttpService } from "@nestjs/axios"
import { ConfigService } from "@nestjs/config"
import { CoreResponse } from "@shared/interface/core.response"
import { BadRequestException } from "@nestjs/common"
import { ContractSignIn } from "../contract/signin.contract"

describe("E2E Core OAuth Test", () => {
  let coreService: CoreService
  let coreOAuthService: CoreOauthService
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
        CoreOauthService,
        CoreService,
      ],
    }).compile()

    coreService = module.get<CoreService>(CoreService)
    coreOAuthService = module.get<CoreOauthService>(CoreOauthService)
    httpService = module.get(HttpService)
  })

  it("should provide service once initialize", () => {
    expect(coreOAuthService).toBeDefined()
  })

  it("signIn() should return payload", async () => {
    const mockResponse: CoreResponse = {
      code: "",
      message: "",
      payload: { access_token: "token", refresh_token: "token" },
    }

    jest.spyOn(coreService, "post").mockResolvedValue(mockResponse)

    const result = await coreOAuthService.signIn({
      locale: "test",
      username: "test",
      password: "test",
      client_id: "test",
      client_secret: "test",
    } as ContractSignIn)

    expect(coreService.post).toHaveBeenCalledWith(
      "/gateway/v3.0/oauth/signin",
      {
        locale: "test",
        username: "test",
        password: "test",
        client_id: "test",
        client_secret: "test",
      },
    )
    expect(result).toHaveProperty("access_token")
  })

  it("signIn() should throw BadRequestException", async () => {
    jest.spyOn(coreService, "post").mockRejectedValue(new Error("fail"))

    await expect(coreOAuthService.signIn({} as any)).rejects.toBeInstanceOf(
      BadRequestException,
    )
  })

  it("authenticateBusiness() should return payload", async () => {
    const mockResponse: CoreResponse = {
      code: "",
      message: "",
      payload: { userProfile: {} },
    }

    jest.spyOn(coreService, "get").mockResolvedValue(mockResponse)

    const result = await coreOAuthService.authenticateBusiness("test")

    expect(coreService.get).toHaveBeenCalledWith(
      "/gateway/v3.0/business/home",
      {
        headers: {
          Authorization: "test",
        },
      },
    )

    expect(result).toHaveProperty("userProfile")
  })

  it("authenticateBusiness() should throw BadRequestException", async () => {
    jest.spyOn(coreService, "get").mockRejectedValue(new Error("fail"))

    await expect(
      coreOAuthService.authenticateBusiness("test"),
    ).rejects.toBeInstanceOf(BadRequestException)
  })
})
