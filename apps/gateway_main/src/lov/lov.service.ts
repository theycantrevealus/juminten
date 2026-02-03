import { LOV } from "@database/schema/lov.schema"
import { Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_LOV } from "@shared/repository"
import { DTOCreateLOV } from "./lov.dto.create"
import { DTOUpdateLOV } from "./lov.dto.update"

@Injectable()
export class LOVService {
  constructor(
    @Inject(REPOSITORY_LOV)
    private readonly repoLOV: Repository<LOV>,
  ) {}

  /**
   * Return all LOV data partially by filter, projection, and etc
   *
   * @returns { LOV[] }
   */
  async all(config = {}): Promise<LOV[]> {
    return await this.repoLOV.findAll({
      select: [
        "META().id",
        "group_name",
        "set_value",
        "description",
        "additional",
      ],
      orderBy: {
        field: "group_name",
        direction: "ASC",
      },
      limit: 10,
      offset: 0,
    })
  }

  /**
   * Add new LOV from Tere FE
   *
   * @param { DTOCreateLOV } payload - LOV data to create
   * @returns { void }
   */
  async create(payload: DTOCreateLOV): Promise<void> {
    await this.repoLOV.create(
      {
        ...payload,
      },
      `lov::${payload.group_name}:${JSON.stringify(payload.set_value)}`,
    )
  }

  /**
   * Update LOV
   */
  async update(id: string, payload: DTOUpdateLOV): Promise<void> {
    await this.repoLOV.update(id, payload)
  }

  /**
   * Delete LOV
   *
   * @param { string } id - ID to delete
   * @returns { void }
   */
  async remove(id: string): Promise<void> {
    await this.repoLOV.delete(id)
  }
}
