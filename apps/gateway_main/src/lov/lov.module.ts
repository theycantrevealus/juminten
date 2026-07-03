import { Module, Provider } from "@nestjs/common"
import { LOVController } from "./lov.controller"
import { LOVService } from "./lov.service"

@Module({
  controllers: [LOVController],
  providers: [LOVService] as Provider[],
  exports: [LOVService],
})
export class LOVModule {}
