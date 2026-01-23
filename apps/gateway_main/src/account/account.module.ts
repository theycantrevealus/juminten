import { Module } from "@nestjs/common"
import { AccountController } from "./account.controller"
import { AccountService } from "./account.service"
import { CouchBaseModule } from "nestjs-couchbase"
import { Account } from "@database/couchbase/model/account.model"
import { RepositoryAccount } from "@database/repository/account.repository"

@Module({
  imports: [CouchBaseModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, RepositoryAccount],
  exports: [AccountService, RepositoryAccount],
})
export class AccountModule {}
