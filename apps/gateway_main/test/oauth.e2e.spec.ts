import { CanActivate, ExecutionContext } from "@nestjs/common"
import { NestFastifyApplication } from "@nestjs/platform-fastify"

describe("Gateway E2E Test", () => {
  const mock_Guard: CanActivate = {
    canActivate: jest.fn((context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest()
      request.credential = {}
      return true
    }),
  }

  let app: NestFastifyApplication

  beforeEach(async () => {
    //
  })

  it("Should provide service once initialize", () => {
    //
  })

  afterAll(async () => {
    //
  })
})
