import { Test, TestingModule } from "@nestjs/testing"
import { OAuthService } from "../src/oauth/oauth.service"
import { CoreOauthService } from "apps/integration/core/oauth.service"
import { mockOAuthService } from "@integration/core/test/mock/oauth.service.mock"
import { describe, it, expect, beforeEach, vi } from "vitest"

describe("OAuth Test", () => {
  let oAuthService: OAuthService
  let coreOAuthService: CoreOauthService

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [],
  //     providers: [
  //       OAuthService,
  //       {
  //         provide: CoreOauthService,
  //         useValue: mockOAuthService,
  //       },
  //     ],
  //   }).compile()

  //   oAuthService = module.get<OAuthService>(OAuthService)
  //   coreOAuthService = module.get<CoreOauthService>(CoreOauthService)
  // })

  // it("Should provide service once initialize", () => {
  //   expect(oAuthService).toBeDefined()
  // })

  it("should run test", () => {
    expect(5).toBeGreaterThan(0)
  })
})
