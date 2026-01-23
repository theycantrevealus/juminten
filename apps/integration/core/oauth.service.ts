import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { CoreService } from "./service"
import { CoreResponse } from "@shared/interface/core.response"
import { ContractSignIn } from "./contract/signin.contract"

@Injectable()
export class CoreOauthService {
  constructor(private readonly coreService: CoreService) {}

  async signIn<T>(payload: ContractSignIn): Promise<T> {
    try {
      const response: CoreResponse = await this.coreService.post(
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
      const response: CoreResponse = await this.coreService.get(
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
