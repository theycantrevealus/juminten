import { Injectable } from "@nestjs/common"
import { DTOSignIn } from "./oauth.dto.signin"
import { CoreOauthService } from "@e2e/core/oauth.service"

@Injectable()
export class OauthService {
  constructor(private readonly coreOAuthService: CoreOauthService) {}

  async signIn(payload: DTOSignIn) {
    return await this.coreOAuthService.signIn(payload)
  }
}
