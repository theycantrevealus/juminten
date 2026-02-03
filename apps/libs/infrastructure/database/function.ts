import { InjectionToken, Provider } from "@nestjs/common"
import { ModuleRef } from "@nestjs/core"
import { RepositoryFeature } from "./interface"

export function createRepositoryProvider(token: InjectionToken): Provider {
  return {
    provide: token,
    useFactory: (features: RepositoryFeature[], moduleRef: ModuleRef) => {
      const feature = features.find((f) => f.provider === token)

      if (!feature) {
        throw new Error(`Repository ${String(token)} not configured`)
      }

      return moduleRef.create(feature.repository)
    },
    inject: ["REPOSITORY_FEATURES", ModuleRef],
  }
}
