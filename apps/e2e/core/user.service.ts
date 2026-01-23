import { BadRequestException, Injectable } from "@nestjs/common"
import { CoreService } from "./service"
import { CoreResponse } from "@shared/interface/core.response"

@Injectable()
export class CoreUserService extends CoreService {
  /**
   * @function userDetail
   * Fetch user list from core
   *
   * @param { string } token - Token to authenticate
   * @returns
   */
  async userList<T>(token: string): Promise<T> {
    try {
      const response: CoreResponse = await this.get("/gateway/v3.0/user/", {
        headers: {
          Authorization: token,
        },
      })
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
      const response: CoreResponse = await this.get(
        `/gateway/v3.0/user/${userId}`,
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
