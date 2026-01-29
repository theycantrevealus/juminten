import { LOV } from "@database/schema/lov.schema"
import { Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_LOV } from "@shared/repository"

@Injectable()
export class LOVService {
  constructor(
    @Inject(REPOSITORY_LOV)
    private readonly repoLOV: Repository<LOV>,
  ) {}

  async all() {
    return await this.repoLOV.findAll()
  }

  async create(data: LOV) {}
}
