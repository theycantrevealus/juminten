import { Module } from "@nestjs/common"
import { AccountModule } from "./account/account.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { WinstonModule } from "@module/logger/module"
import { environmentIdentifier, environmentName } from "@shared/environment"
import { WinstonCustomTransports } from "@module/logger/transport"
import { ConfigSchema } from "@configuration/schema"
import { CouchbaseConfig } from "@configuration/register/couchbase"
import { OAuthModule } from "./oauth/oauth.module"
import { CoreConfig } from "@configuration/register/core"
import { ModelConfig } from "@configuration/register/model"
import { CouchbaseModule } from "@database/couchbase/module"
import { LOVModule } from "./lov/lov.module"
import { CacheModule } from "@nestjs/cache-manager"
import { CoreModule } from "@integration/core/module"
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `${environmentIdentifier}/model.env`,
        `${environmentIdentifier}/couchbase.env`,
        `${environmentIdentifier}/core.env`,
      ],
      load: [CouchbaseConfig, CoreConfig, ModelConfig],
      validationSchema: ConfigSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    CacheModule.register({ isGlobal: true }),
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
    CouchbaseModule.forRootAsync([
      {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          connectionString: configService.get("couchbase.connectionString"),
          username: configService.get("couchbase.username"),
          password: configService.get("couchbase.password"),
          scopeName: configService.get("couchbase.scope"),
          bucketName: configService.get("couchbase.bucket"),
        }),
        inject: [ConfigService],
      },
    ]),
    CoreModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>("core.url"),
        timeout: 3000,
      }),
      inject: [ConfigService],
    }),
    OAuthModule,
    LOVModule,
  ],
})
export class GatewayMainModule {}
