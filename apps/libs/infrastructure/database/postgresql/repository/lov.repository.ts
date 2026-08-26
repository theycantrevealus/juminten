import { QueryOptions } from "@database/couchbase/interface"
import { PrimeData, Repository } from "@database/provider/interface"
import { LOV } from "@database/schema/lov.schema"
import { Injectable } from "@nestjs/common"

@Injectable()
export class LOVRepositoryPostgreSQL implements Repository<LOV> {
  constructor() {
    // @InjectRepository(LOVModel)
    // private lovRepository: Repository<LOVModel>,
  }

  findAll(options?: QueryOptions): Promise<LOV[] | PrimeData<LOV>> {
    throw new Error(`Method not implemented. ${options}`)
  }
  findOne(id: string): Promise<LOV | null> {
    throw new Error(`Method not implemented. ${id}`)
  }
  create(entity: LOV, id?: string): Promise<LOV> {
    throw new Error(`Method not implemented. ${id} ${entity}`)
  }
  update(id: string, entity: Partial<LOV>): Promise<Partial<LOV>> {
    throw new Error(`Method not implemented. ${id} ${entity}`)
  }
  delete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`)
  }
  deleteSoft(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`)
  }
}
