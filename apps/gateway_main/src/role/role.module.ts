import { Module, Provider } from "@nestjs/common"
import { RoleController } from "./role.controller"
import { RoleService } from "./role.service"
import { RepositoryModule } from "@database/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { REPOSITORY_ROLE } from "@shared/repository"
import { RoleRepositoryCouchbase } from "@database/couchbase/repository/role.repository"

@Module({
  imports: [
    RepositoryModule.forRootAsync({
      imports: [ConfigModule],
        inject: [ConfigService],
        providers: [REPOSITORY_ROLE],
        useFactory: (config: ConfigService) => {
          const db = config.get<string>("db")

          return [
            {
              provider: REPOSITORY_ROLE,
              repository: db === "mongo" ? undefined : RoleRepositoryCouchbase,
              feature: {
                mongoose: [],
              },
            },
          ]
        },
    })
  ],
  controllers: [RoleController],
  providers: [RoleService] as Provider[],
  exports: [RoleService],
})
export class RoleModule {}
