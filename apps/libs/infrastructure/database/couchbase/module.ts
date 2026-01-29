import { DynamicModule, Global, Module } from "@nestjs/common"
import { CouchbaseConnectionOptions, ICouchBaseAsyncOptions } from "./interface"
import { CONFIG_TOKEN, CONNECTION_TOKEN } from "./contant"
import { Cluster, connect } from "couchbase"

@Global()
@Module({})
export class CouchbaseModule {
  static forRootAsync(optionsArray: ICouchBaseAsyncOptions[]): DynamicModule {
    const providers = optionsArray.flatMap((opt) => {
      const name = opt.name || "default"
      const configToken = CONFIG_TOKEN(name)
      const connToken = CONNECTION_TOKEN(name)

      const configProvider = {
        provide: configToken,
        useFactory: opt.useFactory,
        inject: opt.inject || [],
      }

      const connectionProvider = {
        provide: connToken,
        useFactory: async (config: CouchbaseConnectionOptions) => {
          const cluster: Cluster = await connect(config.connectionString, {
            username: config.username,
            password: config.password,
          })

          return cluster
        },
        inject: [configToken],
      }

      return [configProvider, connectionProvider]
    })

    return {
      module: CouchbaseModule,
      providers,
      exports: providers,
    }
  }
}
