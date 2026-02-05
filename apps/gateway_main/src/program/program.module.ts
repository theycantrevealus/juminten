import { Module, Provider } from "@nestjs/common"
import { ProgramController } from "./program.controller"
import { ProgramService } from "./program.service"
import { ProgramRepositoryCouchbase } from "@database/couchbase/repository/program.repository"
import { RepositoryModule } from "@database/module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { REPOSITORY_PROGRAM } from "@shared/repository"

@Module({
    imports: [
        RepositoryModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            providers: [REPOSITORY_PROGRAM],
            useFactory: (config: ConfigService) => {
                const db = config.get<string>("db")

                return [
                    {
                        provider: REPOSITORY_PROGRAM,
                        repository: ProgramRepositoryCouchbase,
                        feature: {
                            mongoose: [],
                        },
                    },
                ]
            },
        }),
    ],
    controllers: [ProgramController],
    providers: [ProgramService] as Provider[],
    exports: [ProgramService],
})
export class ProgramModule { }
