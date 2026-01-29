import { LOVRepositoryCouchbase } from "@database/couchbase/repository/lov.repository"
import { LOVRepositoryMongo } from "@database/mongo/repository/lov.repository"
import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ModuleRef } from "@nestjs/core"
import { REPOSITORY_LOV } from "@shared/repository"

export const ModelProviderLOV: Provider = {
  provide: REPOSITORY_LOV,
  useFactory: async (configService: ConfigService, moduleRef: ModuleRef) => {
    const dbType = configService.get<string>("model.lov") ?? "coucbase"

    if (dbType === "couchbase") {
      return moduleRef.resolve(LOVRepositoryCouchbase)
    } else if (dbType === "postgre") {
      return moduleRef.resolve(LOVRepositoryMongo)
    }

    return moduleRef.resolve(LOVRepositoryMongo)
  },
  inject: [ConfigService, ModuleRef, LOVRepositoryCouchbase],
}
