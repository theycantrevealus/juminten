import { HttpModule, HttpModuleOptions } from "@nestjs/axios"
import { ModuleMetadata, Type } from "@nestjs/common"

export type CoreModuleOptions = HttpModuleOptions & {
  instance?: HttpModule
}

export interface CoreModuleOptionsFactory {
  createWinstonModuleOptions(): Promise<CoreModuleOptions> | CoreModuleOptions
}

export interface CoreModuleAsyncOptions extends Pick<
  ModuleMetadata,
  "imports"
> {
  useFactory?: (
    ...args: any[]
  ) => Promise<CoreModuleOptions> | CoreModuleOptions
  inject?: any[]
  useClass?: Type<CoreModuleOptionsFactory>
}
