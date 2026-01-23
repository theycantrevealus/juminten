import { Module } from "@nestjs/common"
import { CoreModule } from "../../../e2e/core/module"
import { OauthService } from "./oauth.service"
import { OAuthController } from "./oauth.controller"

@Module({
  imports: [],
  controllers: [OAuthController],
  providers: [OauthService],
  exports: [OauthService],
})
export class OAuthModule {}
