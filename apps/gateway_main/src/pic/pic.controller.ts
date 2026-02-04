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
    Req,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common"
import { PICService } from "./pic.service"
import { DTOCreatePIC } from "./pic.dto.create"
import { DTOUpdatePIC } from "./pic.dto.update"

@Controller({ path: "pic", version: "1" })
export class PICController {
    constructor(private readonly picService: PICService) { }

    @Get()
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(false)
    async all() {
        return await this.picService.all()
    }

    @Post()
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async add(@Body() parameter: DTOCreatePIC, @Req() request: any) {
        return await this.picService.create(parameter, request.user)
    }

    @Patch(":id/edit")
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async update(@Param() param, @Body() parameter: DTOUpdatePIC) {
        return await this.picService.update(param.id, parameter)
    }

    @Delete(":id/delete")
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async remove(@Param() param) {
        return await this.picService.remove(param.id)
    }
}
