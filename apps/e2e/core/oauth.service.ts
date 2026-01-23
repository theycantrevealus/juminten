import { BadRequestException, Injectable } from "@nestjs/common"
import { CoreService } from "./service"
import { CoreResponse } from "@shared/interface/core.response"
import { DTOSignIn } from "apps/gateway_main/src/oauth/oauth.dto.signin"

@Injectable()
export class CoreOauthService extends CoreService {
  async signIn<T>(payload: DTOSignIn): Promise<T> {
    try {
      const response: CoreResponse = await this.post(
        "/gateway/v3.0/oauth/signin",
        payload,
      )
      return response.payload
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async authenticateBusiness<T>(token: string): Promise<T> {
    try {
      const response: CoreResponse = await this.get(
        "/gateway/v3.0/business/home",
        {
          headers: {
            Authorization: token,
          },
        },
      )
      return response.payload
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
