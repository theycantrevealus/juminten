import { Module } from "@nestjs/common"
import { AccountModule } from "./account/account.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { CouchBaseModule } from "nestjs-couchbase"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CouchBaseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connectionString: configService.get("COUCHBASE_CONNECTION_STRING"),
        username: configService.get("COUCHBASE_USERNAME"),
        password: configService.get("COUCHBASE_PASSWORD"),
        bucketName: configService.get("COUCHBASE_BUCKET"),
      }),
      inject: [ConfigService],
    }),
    AccountModule,
  ],
})
export class GatewayMainModule {}
