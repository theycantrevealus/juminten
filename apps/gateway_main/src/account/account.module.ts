import { Module } from "@nestjs/common"
import { AccountController } from "./account.controller"
import { RepositoryAccount } from "@repository/repository/account.repository"
import { AccountService } from "./account.service"
import { CouchBaseModule } from "nestjs-couchbase"
import { Account } from "@repository/couchbase/model/account.model"

@Module({
  imports: [CouchBaseModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, RepositoryAccount],
  exports: [AccountService, RepositoryAccount],
})
export class AccountModule {}
