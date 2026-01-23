import { Injectable } from "@nestjs/common"
import { CoreService } from "./service"

@Injectable()
export class CoreEarnService extends CoreService {
  async earnInject<T>(payload: any): Promise<T> {
    return await this.post("/gateway/v3.0/earn", payload)
  }
}
