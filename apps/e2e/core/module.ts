import { HttpModule } from "@nestjs/axios"
import { DynamicModule, Global, Module, Provider } from "@nestjs/common"
import { CoreService } from "./service"
import { CoreOauthService } from "./oauth.service"
import { CoreUserService } from "./user.service"
import { CoreMemberService } from "./member.service"
import { CoreModuleAsyncOptions } from "./interface"

@Global()
@Module({})
export class CoreModule {
  static registerAsync(options: CoreModuleAsyncOptions): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        ...(options.imports || []),
        HttpModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: options.useFactory,
        }),
      ],
      providers: [
        CoreService,
        CoreOauthService,
        CoreUserService,
        CoreMemberService,
      ],
      exports: [
        HttpModule,
        CoreService,
        CoreOauthService,
        CoreUserService,
        CoreMemberService,
      ],
    }
  }
}
