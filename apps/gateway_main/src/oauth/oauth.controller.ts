import { Body, Controller, Inject, Post, Version } from "@nestjs/common"
import { DTOSignIn } from "./oauth.dto.signin"
import { OauthService } from "./oauth.service"

@Controller("oauth")
export class OAuthController {
  constructor(
    @Inject(OauthService) private readonly oauthService: OauthService,
  ) {}

  @Post("signin")
  @Version("1")
  async signIn(@Body() payload: DTOSignIn) {
    return await this.oauthService.signIn(payload)
  }
}
