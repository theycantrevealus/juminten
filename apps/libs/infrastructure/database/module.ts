import { DynamicModule, Module, Provider } from "@nestjs/common"
import { RepositoryFeature } from "./interface"
import { MongooseModule } from "@nestjs/mongoose"
import { REPOSITORY_LOV } from "@shared/repository"
import { LOVRepositoryCouchbase } from "./couchbase/repository/lov.repository"

@Module({})
export class RepositoryModule {
  static forRootAsync(options: {
    imports?: any[]
    inject?: any[]
    useFactory: (...args: any[]) => RepositoryFeature[]
  }): DynamicModule {
    const imports = []
    const providers: Provider[] = [
      ...options.inject,
      { provide: REPOSITORY_LOV, useClass: LOVRepositoryCouchbase },
    ]

    const features = options.useFactory()
    for (const feature of features) {
      // providers.push(...feature.repository)
      providers.push({
        provide: feature.provider,
        useClass: feature.repository,
      })

      if (feature.feature.mongoose) {
        imports.push(MongooseModule.forFeature(feature.feature.mongoose))
      }
    }

    return {
      module: RepositoryModule,
      imports: [
        ...(options.imports ?? []),
        {
          module: class RepositoryRuntimeModule {},
          imports: [],
          providers: [],
          exports: [],
        },
      ],
      providers: providers,
      exports: providers,
    }
  }
}
