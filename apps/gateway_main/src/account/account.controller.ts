import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common"
import { AccountService } from "./account.service"
import { DTOCreateAccount } from "./dto/account.dto.create"
import { GeneralInterceptor } from "@interceptor/general.interceptor"
import { OAuth2Guard } from "@guard/oauth.guard"
import { Authorization } from "@decorator/auth.decorator"
import { DTOUpdateAccount } from "./dto/account.dto.update"

@Controller({ path: "account", version: "1" })
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async all(@Query("lazyEvent") parameter: string) {
    return await this.accountService.all(parameter)
  }

  @Post()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async add(@Body() parameter: DTOCreateAccount) {
    return await this.accountService.add(parameter)
  }

  @Patch(":id/edit")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async update(@Param() param, @Body() parameter: DTOUpdateAccount) {
    return await this.accountService.update(param.id, parameter)
  }

  @Delete(":id/delete")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async remove(@Param() param) {
    return await this.accountService.remove(param.id)
  }

  @Delete(":id/soft")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async removeSoft(@Param() param) {
    return await this.accountService.removeSoft(param.id)
  }
}
