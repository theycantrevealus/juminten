import { Module } from "@nestjs/common"
import { AccountModule } from "./account/account.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { CouchBaseModule } from "nestjs-couchbase"
import { WinstonModule } from "@module/logger/module"
import { environmentIdentifier, environmentName } from "@shared/environment"
import { WinstonCustomTransports } from "@module/logger/transport"
import { ConfigSchema } from "@configuration/schema"
import { CouchbaseConfig } from "@configuration/register/couchbase"
import { OAuthModule } from "./oauth/oauth.module"
import { LOVModule } from "./lov/lov.module"
import { CoreModule } from "apps/integration/core/module"
import { CoreConfig } from "@configuration/register/core"
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `${environmentIdentifier}/couchbase.env`,
        `${environmentIdentifier}/core.env`,
      ],
      load: [CouchbaseConfig, CoreConfig],
      validationSchema: ConfigSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        handleRejections: true,
        handleExceptions: true,
        colorize:
          configService.get<boolean>("application.log.colorize") ?? true,
        transports: WinstonCustomTransports[environmentName],
      }),
      inject: [ConfigService],
    }),
    CouchBaseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connectionString: configService.get("couchbase.connectionString"),
        username: configService.get("couchbase.username"),
        password: configService.get("couchbase.password"),
        bucketName: configService.get("couchbase.bucket"),
      }),
      inject: [ConfigService],
    }),
    CoreModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>("core.url"),
        timeout: 3000,
      }),
      inject: [ConfigService],
    }),
    AccountModule,
    OAuthModule,
    LOVModule,
  ],
})
export class GatewayMainModule {}
