import { ModuleMetadata, Type } from "@nestjs/common"

export interface CouchbaseConnectionOptions {
  name?: string // optional, default = 'default'
  connectionString: string
  bucketName: string // global bucket for connection
  scopeName?: string // TODO
  collectionName?: string // TODO
  username: string
  password: string
}

export interface ICouchBaseOptionsFactory {
  createCouchbaseOptions():
    | Promise<CouchbaseConnectionOptions>
    | CouchbaseConnectionOptions
}

export interface ICouchBaseAsyncOptions extends Pick<
  ModuleMetadata,
  "imports"
> {
  name?: string
  useExisting?: Type<ICouchBaseOptionsFactory>
  useClass?: Type<ICouchBaseOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<CouchbaseConnectionOptions> | CouchbaseConnectionOptions
  inject?: any[]
}
