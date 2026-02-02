import { InjectionToken, Provider } from "@nestjs/common"

export interface RepositoryFeature {
  provider: symbol | InjectionToken
  feature: {
    mongoose?: any[]
    typeorm?: any[]
    couchbase?: any[]
  }
  repository: any
}
