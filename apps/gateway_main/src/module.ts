import { Module } from "@nestjs/common"
import { AccountModule } from "./account/account.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { WinstonModule } from "@module/logger/module"
import { environmentIdentifier, environmentName } from "@shared/environment"
import { WinstonCustomTransports } from "@module/logger/transport"
import { ConfigSchema } from "@configuration/index"
import { CouchbaseConfig } from "@configuration/couchbase"
import { OAuthModule } from "./oauth/oauth.module"
import { CoreConfig } from "@configuration/core"
import { ModelConfig } from "@configuration/model"
import { CouchbaseModule } from "@database/couchbase/module"
import { LOVModule } from "./lov/lov.module"
import { CacheModule } from "@nestjs/cache-manager"
import { CoreModule } from "@integration/core/module"
import { RepositoryModule } from "@database/module"
import { REPOSITORY_LOV } from "@shared/repository"
import { LOVRepositoryMongo } from "@database/mongo/repository/lov.repository"
import { LOVRepositoryCouchbase } from "@database/couchbase/repository/lov.repository"
import { ApplicationConfig } from "@configuration/application"
import { MongoConfig } from "@configuration/mongo"
import { MongooseModule } from "@nestjs/mongoose"
import { LOV } from "@database/schema/lov.schema"
import { LovSchema } from "@database/mongo/schema/lov.schema"
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `${environmentIdentifier}/application.env`,
        `${environmentIdentifier}/model.env`,
        `${environmentIdentifier}/mongo.env`,
        `${environmentIdentifier}/couchbase.env`,
        `${environmentIdentifier}/core.env`,
      ],
      load: [
        ApplicationConfig,
        MongoConfig,
        CouchbaseConfig,
        CoreConfig,
        ModelConfig,
      ],
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
    RepositoryModule.forRootAsync({
      isGlobal: true,
      imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            uri: config.get<string>("mongo.url"),
            user: config.get<string>("mongo.user"),
            pass: config.get<string>("mongo.password"),
            dbName: config.get<string>("mongo.dbName"),
          }),
        }),
        MongooseModule.forFeature([{ name: LOV.name, schema: LovSchema }]),
        CouchbaseModule.forRootAsync([
          {
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              connectionString:
                configService.get<string>("couchbase.connectionString") ?? "",
              username: configService.get<string>("couchbase.username") ?? "",
              password: configService.get<string>("couchbase.password") ?? "",
              scopeName: configService.get<string>("couchbase.scope") ?? "",
              bucketName: configService.get<string>("couchbase.bucket") ?? "",
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      inject: [ConfigService],
      providers: [REPOSITORY_LOV],
      useFactory: (config: ConfigService) => {
        const db = config.get<string>("app.db")

        return [
          {
            provider: REPOSITORY_LOV,
            repository:
              db === "mongo" ? LOVRepositoryMongo : LOVRepositoryCouchbase,
            feature: {
              mongoose: [],
            },
          },
        ]
      },
    }),
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
