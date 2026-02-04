import { ModuleMetadata, Type } from "@nestjs/common"

export interface CouchbaseConnectionOptions {
  name?: string
  connectionString: string
  bucketName: string
  scopeName?: string
  schemaName?: string
  collectionName?: string
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

export interface QueryOptions {
  fields?: string[]
  where?: Record<string, any>
  withSoft?: boolean
  limit?: number
  offset?: number
  orderBy?: {
    field: string
    direction?: "ASC" | "DESC"
  }
}
