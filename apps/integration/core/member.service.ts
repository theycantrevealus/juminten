import { BadRequestException, Injectable } from "@nestjs/common"
import { CoreService } from "./service"
import { CoreResponse } from "@shared/interface/core.response"
import { ContractMemberAdd } from "./contract/member.add.contract"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class CoreMemberService {
  constructor(
    private readonly configService: ConfigService,
    private readonly coreService: CoreService,
  ) {}
  /**
   * @function memberBalance
   * Fetch user list from core
   *
   * @param { string } token - Token to authenticate
   * @param { string } memberId - Member ID to get
   * @returns
   */
  async memberBalance<T>(token: string, memberId: string): Promise<T> {
    try {
      const response: CoreResponse = await this.coreService.get(
        `/gateway/v3.0/members/${memberId}`,
        {
          params: {
            merchant_id: this.configService.get<string>("core.merchantId"),
          },
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

  /**
   * @function memberCreate
   * Command to create member on core
   *
   * @param { string } token - Token to authenticate
   * @param { ContractMemberAdd } payload - Member add contract
   * @returns
   */
  async memberCreate<T>(token: string, payload: ContractMemberAdd): Promise<T> {
    try {
      return await this.coreService
        .post("/gateway/v3.0/oauth/member/add", payload, {
          headers: { Authorization: token },
        })
        .then(async (response: CoreResponse) => {
          const data = response.payload

          return data
        })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
