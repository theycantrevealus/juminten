import { Module, Provider } from "@nestjs/common"
import { LOVController } from "./lov.controller"
import { ModelProviderLOV } from "@database/provider/lov.provider"
import { LOVService } from "./lov.service"
import { LOVRepositoryCouchbase } from "@database/couchbase/repository/lov.repository"
import { RepositoryModule } from "@database/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { REPOSITORY_LOV } from "@shared/repository"
import { LovSchema } from "@database/mongo/schema/lov.schema"
import { LOV } from "@database/schema/lov.schema"
import { LOVRepositoryMongo } from "@database/mongo/repository/lov.repository"

@Module({
  imports: [
    RepositoryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // const db = configService.get<string>("model.lov")
        const db: string = "couchbase"

        if (db === "mongo") {
          return [
            {
              provider: REPOSITORY_LOV,
              feature: {
                mongoose: [{ name: LOV.name, schema: LovSchema }],
              },
              repository: LOVRepositoryMongo,
            },
          ]
        }

        return [
          {
            provider: REPOSITORY_LOV,
            feature: {
              couchbase: [],
            },
            repository: LOVRepositoryCouchbase,
          },
        ]
      },
    }),
  ],
  controllers: [LOVController],
  providers: [
    // LOVRepositoryCouchbase,
    // ModelProviderLOV,
    LOVService,
  ] as Provider[],
  exports: [LOVService],
})
export class LOVModule {}
