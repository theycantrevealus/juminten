import { Module, Provider } from "@nestjs/common"
import { LOVController } from "./lov.controller"
import { MongooseModule } from "@nestjs/mongoose"
import { LOV, LovSchema } from "@database/mongo/schema/lov.schema"
import { LOVRepositoryMongo } from "@database/mongo/repository/lov.repository"
import { REPOSITORY_LOV } from "@shared/repository"
import { ConfigService } from "@nestjs/config"
import { ModuleRef } from "@nestjs/core"

@Module({
  imports: [MongooseModule.forFeature([{ name: LOV.name, schema: LovSchema }])],
  controllers: [LOVController],
  providers: [
    {
      provide: REPOSITORY_LOV,
      useFactory: async (
        configService: ConfigService,
        moduleRef: ModuleRef,
      ) => {
        // const dbType = configService.get<string>("DB_TYPE") ?? "coucbase"
        const dbType: string = "coucbase"

        if (dbType === "couchbase") {
          return moduleRef.resolve(LOVRepositoryMongo)
        } else if (dbType === "postgre") {
          return moduleRef.resolve(LOVRepositoryMongo)
        }

        return moduleRef.resolve(LOVRepositoryMongo)
      },
    },
  ] as Provider[],
  exports: [],
})
export class LOVModule {}
