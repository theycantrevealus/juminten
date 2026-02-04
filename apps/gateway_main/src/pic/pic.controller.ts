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
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common"
import { PICService } from "./pic.service"
import { DTOCreatePIC } from "./pic.dto.create"
import { DTOUpdatePIC } from "./pic.dto.update"
import { DTOPrimeTableQuery } from "./pic.dto.prime"

@Controller({ path: "pic", version: "1" })
export class PICController {
    constructor(private readonly picService: PICService) { }

    @Get()
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async all() {
        return await this.picService.all()
    }

    @Get("prime")
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async allPrime(@Query() query: DTOPrimeTableQuery) {
        return await this.picService.allPrime(query)
    }

    @Post()
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async add(@Body() parameter: DTOCreatePIC, @Req() request: any) {
        const { user_profile, authorizes } = request.user || {}
        return await this.picService.create(parameter, { user_profile, authorizes })
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

    @Delete(":id/soft")
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async removeSoft(@Param() param) {
        return await this.picService.removeSoft(param.id)
    }
}
