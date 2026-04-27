import { Module, Provider } from "@nestjs/common"
import { AccountController } from "./account.controller"
import { AccountService } from "./account.service"
import { RepositoryModule } from "@database/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { REPOSITORY_ACCOUNT } from "@shared/repository"
import { AccountRepositoryCouchbase } from "@database/couchbase/repository/account.repository"

@Module({
  imports: [
    RepositoryModule.forRootAsync({
      imports: [ConfigModule],
        inject: [ConfigService],
        providers: [REPOSITORY_ACCOUNT],
        useFactory: (config: ConfigService) => {
          const db = config.get<string>("db")

          return [
            {
              provider: REPOSITORY_ACCOUNT,
              repository: db === "mongo" ? undefined : AccountRepositoryCouchbase,
              feature: {
                mongoose: [],
              },
            },
          ]
        },
    })
  ],
  controllers: [AccountController],
  providers: [AccountService] as Provider[],
  exports: [AccountService],
})
export class AccountModule {}
