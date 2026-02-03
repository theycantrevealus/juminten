import { Module, Provider } from "@nestjs/common"
import { LOVController } from "./lov.controller"
import { LOVService } from "./lov.service"
import { LOVRepositoryCouchbase } from "@database/couchbase/repository/lov.repository"
import { RepositoryModule } from "@database/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { REPOSITORY_LOV } from "@shared/repository"
import { LOVRepositoryMongo } from "@database/mongo/repository/lov.repository"

@Module({
  imports: [
    RepositoryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      providers: [REPOSITORY_LOV],
      useFactory: (config: ConfigService) => {
        const db = config.get<string>("db")

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
  ],
  controllers: [LOVController],
  providers: [LOVService] as Provider[],
  exports: [LOVService],
})
export class LOVModule {}
