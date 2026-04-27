import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common"
import { AccountService } from "./account.service"
import { DTOAccountAdd } from "./account.dto.add"
import { GeneralInterceptor } from "@interceptor/general.interceptor"
import { OAuth2Guard } from "@guard/oauth.guard"
import { Authorization } from "@decorator/auth.decorator"

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async all(@Query("lazyEvent") parameter: string) {
    return await this.accountService.all(parameter)
  }
}
