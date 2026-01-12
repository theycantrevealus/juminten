import { Injectable } from "@nestjs/common"
import { DTOSignIn } from "./oauth.dto.signin"
import { CoreService } from "../../../e2e/core/service"

@Injectable()
export class OauthService {
  constructor(private readonly coreService: CoreService) {}

  async signIn(payload: DTOSignIn) {
    return await this.coreService.signIn(payload)
  }
}
