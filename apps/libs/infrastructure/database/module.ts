import { DynamicModule, InjectionToken, Module, Provider } from "@nestjs/common"
import { RepositoryFeature } from "./interface"
import { MongooseModule } from "@nestjs/mongoose"
import { REPOSITORY_LOV } from "@shared/repository"
import { LOVRepositoryCouchbase } from "./couchbase/repository/lov.repository"
import { features } from "node:process"
import { ModuleRef } from "@nestjs/core"
import { createRepositoryProvider } from "./function"

@Module({})
export class RepositoryModule {
  static forRootAsync(options: {
    imports?: any[]
    inject?: any[]
    useFactory: (...args: any[]) => RepositoryFeature[]
    providers: InjectionToken[]
  }): DynamicModule {
    const repositoryFeaturesProvider: Provider = {
      provide: "REPOSITORY_FEATURES",
      useFactory: options.useFactory,
      inject: options.inject ?? [],
    }

    const repositoryProviders = options.providers.map((token) =>
      createRepositoryProvider(token),
    )

    return {
      module: RepositoryModule,
      imports: options.imports ?? [],
      providers: [repositoryFeaturesProvider, ...repositoryProviders],
      exports: [...repositoryProviders],
    }
  }
}
