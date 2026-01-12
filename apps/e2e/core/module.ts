import { HttpModule, HttpModuleOptions, HttpService } from "@nestjs/axios"
import { DynamicModule, Global, Module } from "@nestjs/common"
import { CoreService } from "./service"

@Global()
@Module({})
export class CoreModule {
  static register(options: HttpModuleOptions): DynamicModule {
    return {
      module: CoreModule,
      imports: [HttpModule.register(options)],
      providers: [CoreService],
      exports: [CoreService],
    }
  }
}
