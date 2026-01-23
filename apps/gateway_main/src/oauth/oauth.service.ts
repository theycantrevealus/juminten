import { Injectable } from "@nestjs/common"
import { DTOSignIn } from "./oauth.dto.signin"
import { CoreOauthService } from "apps/integration/core/oauth.service"

@Injectable()
export class OAuthService {
  constructor(private readonly coreOAuthService: CoreOauthService) {}

  async signIn(payload: DTOSignIn) {
    return await this.coreOAuthService.signIn(payload)
  }
}
