import { Inject, Injectable } from "@nestjs/common"
import { Location } from "../../schema/location.schema"
import { CONNECTION_TOKEN } from "../constant"
import { CouchbaseInstance } from "../service"
import { BaseCouchbaseRepository } from "./base.repository"

@Injectable()
export class LocationRepositoryCouchbase extends BaseCouchbaseRepository<Location> {

  constructor(@Inject(CONNECTION_TOKEN("default")) couchbase: CouchbaseInstance) {
    super(couchbase, "location", Location.create)
  }
}