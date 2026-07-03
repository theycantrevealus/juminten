import { DynamicModule, InjectionToken, Module, Provider } from "@nestjs/common"
import { RepositoryFeature } from "./interface"
import { createRepositoryProvider } from "./function"

@Module({})
export class RepositoryModule {
  static forRootAsync(options: {
    imports?: any[]
    inject?: any[]
    useFactory: (...args: any[]) => RepositoryFeature[]
    providers: InjectionToken[]
    isGlobal?: boolean
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
      global: options.isGlobal,
      module: RepositoryModule,
      imports: options.imports ?? [],
      providers: [repositoryFeaturesProvider, ...repositoryProviders],
      exports: [...repositoryProviders],
    }
  }
}
