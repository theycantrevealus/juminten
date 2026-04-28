import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common"
import { RoleService } from "./role.service"
import { DTOCreateRole } from "./dto/role.dto.create"
import { GeneralInterceptor } from "@interceptor/general.interceptor"
import { OAuth2Guard } from "@guard/oauth.guard"
import { Authorization } from "@decorator/auth.decorator"
import { DTOUpdateRole } from "./dto/role.dto.update"

@Controller({ path: "role", version: "1" })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async all(@Query("lazyEvent") parameter: string) {
    return await this.roleService.all(parameter)
  }

  @Post()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async add(@Body() parameter: DTOCreateRole) {
    return await this.roleService.add(parameter)
  }

  @Patch(":id/edit")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async update(@Param() param, @Body() parameter: DTOUpdateRole) {
    return await this.roleService.update(param.id, parameter)
  }

  @Delete(":id/delete")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async remove(@Param() param) {
    return await this.roleService.remove(param.id)
  }

  @Delete(":id/soft")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async removeSoft(@Param() param) {
    return await this.roleService.removeSoft(param.id)
  }
}
