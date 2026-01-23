import { Module } from "@nestjs/common"
import { LOVController } from "./lov.controller"

@Module({
  imports: [],
  controllers: [LOVController],
  providers: [],
  exports: [],
})
export class LOVModule {}
