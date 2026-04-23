import { QueryOptions } from "@database/couchbase/interface"
import { PrimeData, Repository } from "@database/provider/interface"
import { LOV } from "@database/schema/lov.schema"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LOVModel } from "../model/lov"

@Injectable()
export class LOVRepositoryPostgreSQL implements Repository<LOV> {
  constructor(
    @InjectRepository(LOVModel)
    private lovRepository: Repository<LOVModel>,
  ) {}

  findAll(options?: QueryOptions): Promise<LOV[] | PrimeData<LOV>> {
    throw new Error("Method not implemented.")
  }
  findOne(id: string): Promise<LOV | null> {
    throw new Error("Method not implemented.")
  }
  create(entity: LOV, id?: string): Promise<LOV> {
    throw new Error("Method not implemented.")
  }
  update(id: string, entity: Partial<LOV>): Promise<Partial<LOV>> {
    throw new Error("Method not implemented.")
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  deleteSoft(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
