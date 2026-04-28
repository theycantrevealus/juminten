import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common"
import { LocationService } from "./location.service"
import { DTOCreateLocation } from "./dto/location.dto.create"
import { GeneralInterceptor } from "@interceptor/general.interceptor"
import { OAuth2Guard } from "@guard/oauth.guard"
import { Authorization } from "@decorator/auth.decorator"
import { DTOUpdateLocation } from "./dto/location.dto.update"

@Controller({ path: "location", version: "1" })
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async all(@Query("lazyEvent") parameter: string) {
    return await this.locationService.all(parameter)
  }

  @Post()
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async add(@Body() parameter: DTOCreateLocation) {
    return await this.locationService.add(parameter)
  }

  @Patch(":id/edit")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async update(@Param() param, @Body() parameter: DTOUpdateLocation) {
    return await this.locationService.update(param.id, parameter)
  }

  @Delete(":id/delete")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async remove(@Param() param) {
    return await this.locationService.remove(param.id)
  }

  @Delete(":id/soft")
  @UseInterceptors(GeneralInterceptor)
  @UseGuards(OAuth2Guard)
  @Authorization(true)
  async removeSoft(@Param() param) {
    return await this.locationService.removeSoft(param.id)
  }
}
