import { Inject, Injectable } from "@nestjs/common"
import { Account } from "../../schema/account.schema"
import { CONNECTION_TOKEN } from "../constant"
import { CouchbaseInstance } from "../service"
import { BaseCouchbaseRepository } from "./base.repository"

@Injectable()
export class AccountRepositoryCouchbase extends BaseCouchbaseRepository<Account> {

  constructor(@Inject(CONNECTION_TOKEN("default")) couchbase: CouchbaseInstance) {
    super(couchbase, "account", Account.create)
  }
}