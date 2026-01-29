import { Module, Provider } from "@nestjs/common"
import { LOVController } from "./lov.controller"
import { ModelProviderLOV } from "@database/provider/lov.provider"
import { LOVService } from "./lov.service"
import { LOVRepositoryCouchbase } from "@database/couchbase/repository/lov.repository"

@Module({
  imports: [],
  controllers: [LOVController],
  providers: [
    LOVRepositoryCouchbase,
    ModelProviderLOV,

    LOVService,
  ] as Provider[],
  exports: [LOVService],
})
export class LOVModule {}
