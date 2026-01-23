import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { CoreService } from "./service"
import { CoreResponse } from "@shared/interface/core.response"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class CoreUserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly coreService: CoreService,
  ) {}
  /**
   * @function userDetail
   * Fetch user list from core
   *
   * @param { string } token - Token to authenticate
   * @returns
   */
  async userList<T>(token: string): Promise<T> {
    try {
      const response: CoreResponse = await this.coreService.get(
        "/gateway/v3.0/user/",
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
   * @function userDetail
   * Fetch user detail from core by given user ID
   *
   * @param { string } token - Token to authenticate
   * @param { string } userId - User ID
   * @returns
   */
  async userDetail<T>(token: string, userId: string): Promise<T> {
    try {
      const response: CoreResponse = await this.coreService.get(
        `/gateway/v3.0/user/${userId}`,
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
}
