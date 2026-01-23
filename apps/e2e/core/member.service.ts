import { BadRequestException, Injectable } from "@nestjs/common"
import { CoreService } from "./service"
import { CoreResponse } from "@shared/interface/core.response"

@Injectable()
export class CoreMemberService extends CoreService {
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
      const response: CoreResponse = await this.get(
        `/gateway/v3.0/members/${memberId}`,
        {
          params: {
            merchant_id: "",
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
}
