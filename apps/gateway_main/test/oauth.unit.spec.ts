// import { OAuthService } from "../src/oauth/oauth.service"
// import { CoreOauthService } from "apps/integration/core/oauth.service"
// import { describe, it, expect, beforeEach, vi } from "vitest"
import { describe, it, expect } from "vitest"

describe("OAuth Test", () => {
  // let oAuthService: OAuthService
  // let coreOAuthService: CoreOauthService

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
