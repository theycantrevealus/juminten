import { HttpModule } from "@nestjs/axios"
import { DynamicModule, Global, Module, Provider } from "@nestjs/common"
import { CoreService } from "./service"
import { CoreOauthService } from "./oauth.service"
import { CoreUserService } from "./user.service"
import { CoreMemberService } from "./member.service"
import { CoreModuleAsyncOptions } from "./interface"
import { WinstonModule } from "@module/logger/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { WinstonCustomTransports } from "@module/logger/transport"
import { environmentName } from "@shared/environment"

@Global()
@Module({})
export class CoreModule {
  static registerAsync(options: CoreModuleAsyncOptions): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        ...(options.imports || []),
        WinstonModule.forRootAsync(
          {
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              handleRejections: true,
              handleExceptions: true,
              colorize:
                configService.get<boolean>("application.log.colorize") ?? true,
              transports: WinstonCustomTransports[environmentName],
            }),
            inject: [ConfigService],
          },
          "IntegrationCore",
        ),
        HttpModule.registerAsync({
          global: true,
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
      exports: [CoreOauthService, CoreUserService, CoreMemberService],
    }
  }
}
