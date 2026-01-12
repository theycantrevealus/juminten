import { Module } from "@nestjs/common"
import { CoreModule } from "../../../e2e/core/module"
import { OauthService } from "./oauth.service"
import { OAuthController } from "./oauth.controller"

@Module({
  imports: [
    CoreModule.register({
      baseURL: "https://api.developer.wegiv.co",
      timeout: 3000,
    }),
  ],
  controllers: [OAuthController],
  providers: [OauthService],
  exports: [OauthService],
})
export class OAuthModule {}
