import { DynamicModule, Global, LoggerService, Module } from "@nestjs/common"

import { WinstonModuleAsyncOptions, WinstonModuleOptions } from "./interface"
import {
  createNestWinstonLogger,
  createWinstonAsyncProviders,
  createWinstonProviders,
} from "./provider"
import { WINSTON_MODULE_PROVIDER } from "./constant"

@Global()
@Module({})
export class WinstonModule {
  public static forRoot(options: WinstonModuleOptions): DynamicModule {
    const providers = createWinstonProviders(options)

    return {
      module: WinstonModule,
      providers: providers,
      exports: providers,
    }
  }

  public static forRootAsync(
    options: WinstonModuleAsyncOptions,
    providerName?: string,
  ): DynamicModule {
    const providers = createWinstonAsyncProviders(
      options,
      providerName ?? WINSTON_MODULE_PROVIDER,
    )

    return {
      module: WinstonModule,
      imports: options.imports,
      providers: providers,
      exports: providers,
    } as DynamicModule
  }

  public static createLogger(options: WinstonModuleOptions): LoggerService {
    return createNestWinstonLogger(options)
  }
}
