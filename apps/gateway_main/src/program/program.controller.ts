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
import { ProgramService } from "./program.service"
import { DTOCreateProgram } from "./program.dto.create"
import { DTOUpdateProgram } from "./program.dto.update"
import { DTOPrimeTableQuery } from "./program.dto.prime"

@Controller({ path: "program", version: "1" })
export class ProgramController {
    constructor(private readonly programService: ProgramService) { }

    @Get()
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async all() {
        return await this.programService.all()
    }

    @Get("prime")
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async allPrime(@Query() query: DTOPrimeTableQuery) {
        return await this.programService.allPrime(query)
    }

    @Post()
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async add(@Body() parameter: DTOCreateProgram, @Req() request: any) {
        const { user_profile, authorizes } = request.user || {}
        return await this.programService.create(parameter, { user_profile, authorizes })
    }

    @Patch(":id/edit")
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async update(@Param() param, @Body() parameter: DTOUpdateProgram) {
        return await this.programService.update(param.id, parameter)
    }

    @Delete(":id/delete")
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async remove(@Param() param) {
        return await this.programService.remove(param.id)
    }

    @Delete(":id/soft")
    @UseInterceptors(GeneralInterceptor)
    @UseGuards(OAuth2Guard)
    @Authorization(true)
    async removeSoft(@Param() param) {
        return await this.programService.removeSoft(param.id)
    }
}
