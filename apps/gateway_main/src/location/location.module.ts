import { Module, Provider } from "@nestjs/common"
import { LocationController } from "./location.controller"
import { LocationService } from "./location.service"
import { RepositoryModule } from "@database/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { REPOSITORY_LOCATION } from "@shared/repository"
import { LocationRepositoryCouchbase } from "@database/couchbase/repository/location.repository"

@Module({
  imports: [
    RepositoryModule.forRootAsync({
      imports: [ConfigModule],
        inject: [ConfigService],
        providers: [REPOSITORY_LOCATION],
        useFactory: (config: ConfigService) => {
          const db = config.get<string>("db")

          return [
            {
              provider: REPOSITORY_LOCATION,
              repository: db === "mongo" ? undefined : LocationRepositoryCouchbase,
              feature: {
                mongoose: [],
              },
            },
          ]
        },
    })
  ],
  controllers: [LocationController],
  providers: [LocationService] as Provider[],
  exports: [LocationService],
})
export class LocationModule {}
