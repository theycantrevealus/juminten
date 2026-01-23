import { Authorization } from "@decorator/auth.decorator"
import { OAuth2Guard } from "@guard/oauth.guard"
import { GeneralInterceptor } from "@interceptor/general.interceptor"
import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common"

@Controller({ path: "lov", version: "1" })
export class LOVController {
  constructor() {}

  @Get()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async all() {}
}
