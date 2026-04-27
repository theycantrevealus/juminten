import { Inject, Injectable } from "@nestjs/common"
import { Role } from "../../schema/role.schema"
import { CONNECTION_TOKEN } from "../constant"
import { CouchbaseInstance } from "../service"
import { BaseCouchbaseRepository } from "./base.repository"

@Injectable()
export class RoleRepositoryCouchbase extends BaseCouchbaseRepository<Role> {

  constructor(@Inject(CONNECTION_TOKEN("default")) couchbase: CouchbaseInstance) {
    super(couchbase, "role", Role.create)
  }
}