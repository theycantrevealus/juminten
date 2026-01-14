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
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${environmentIdentifier}/couchbase.env`],
      load: [CouchbaseConfig],
      validationSchema: ConfigSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          handleRejections: true,
          handleExceptions: true,
          colorize:
            configService.get<boolean>("application.log.colorize") ?? true,
          transports: WinstonCustomTransports[environmentName],
        }
      },
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
    AccountModule,
    OAuthModule,
  ],
})
export class GatewayMainModule {}
