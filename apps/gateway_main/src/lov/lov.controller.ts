import { Authorization } from "@decorator/auth.decorator"
import { OAuth2Guard } from "@guard/oauth.guard"
import { GeneralInterceptor } from "@interceptor/general.interceptor"
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { LOVService } from "./lov.service"
import { DTOCreateLOV } from "./lov.dto.create"
import { DTOUpdateLOV } from "./lov.dto.update"

@Controller({ path: "lov", version: "1" })
export class LOVController {
  constructor(private readonly lovService: LOVService) {}

  @Get()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async all() {
    return await this.lovService.all()
  }

  @Post()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async add(@Body() parameter: DTOCreateLOV) {
    return await this.lovService.create(parameter)
  }

  @Patch(":id/edit")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async update(@Param() param, @Body() parameter: DTOUpdateLOV) {
    return await this.lovService.update(param.id, parameter)
  }

  @Delete(":id/delete")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async remove(@Param() param) {
    return await this.lovService.remove(param.id)
  }

  @Delete(":id/soft")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async removeSoft(@Param() param) {
    return await this.lovService.removeSoft(param.id)
  }
}
