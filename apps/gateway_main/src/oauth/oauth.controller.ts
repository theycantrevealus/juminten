import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
  Version,
} from "@nestjs/common"
import { DTOSignIn } from "./oauth.dto.signin"
import { OAuthService } from "./oauth.service"
import { GeneralInterceptor } from "@interceptor/general.interceptor"

@Controller("oauth")
export class OAuthController {
  constructor(
    @Inject(OAuthService) private readonly oauthService: OAuthService,
  ) {}

  @Post("signin")
  @Version("1")
  @UseInterceptors(GeneralInterceptor)
  async signIn(@Body() payload: DTOSignIn) {
    return await this.oauthService.signIn(payload)
  }
}
