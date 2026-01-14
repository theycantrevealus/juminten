import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
  Version,
} from "@nestjs/common"
import { DTOSignIn } from "./oauth.dto.signin"
import { OauthService } from "./oauth.service"
import { GeneralInterceptor } from "@interceptor/general.interceptor"

@Controller("oauth")
export class OAuthController {
  constructor(
    @Inject(OauthService) private readonly oauthService: OauthService,
  ) {}

  @Post("signin")
  @Version("1")
  @UseInterceptors(GeneralInterceptor)
  async signIn(@Body() payload: DTOSignIn) {
    return await this.oauthService.signIn(payload)
  }
}
