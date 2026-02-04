import { Module, Provider } from "@nestjs/common"
import { PICController } from "./pic.controller"
import { PICService } from "./pic.service"
import { PICRepositoryCouchbase } from "@database/couchbase/repository/pic.repository"
import { RepositoryModule } from "@database/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { REPOSITORY_PIC } from "@shared/repository"
import { PICRepositoryMongo } from "@database/mongo/repository/pic.repository"

@Module({
    imports: [
        RepositoryModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            providers: [REPOSITORY_PIC],
            useFactory: (config: ConfigService) => {
                const db = config.get<string>("db")

                return [
                    {
                        provider: REPOSITORY_PIC,
                        repository:
                            db === "mongo" ? PICRepositoryMongo : PICRepositoryCouchbase,
                        feature: {
                            mongoose: [],
                        },
                    },
                ]
            },
        }),
    ],
    controllers: [PICController],
    providers: [PICService] as Provider[],
    exports: [PICService],
})
export class PICModule { }
