import { LOV } from "@database/schema/lov.schema"
import { PrimeData, Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_LOV } from "@shared/repository"
import { DTOCreateLOV } from "./lov.dto.create"
import { DTOUpdateLOV } from "./lov.dto.update"
import { hash } from "crypto"
import { QueryOptions } from "@database/couchbase/interface"

@Injectable()
export class LOVService {
  constructor(
    @Inject(REPOSITORY_LOV)
    private readonly repoLOV: Repository<LOV>,
  ) {}

  /**
   * Return all LOV data partially by filter, projection, and etc
   *
   * @param { string[] } fields - Fields name to show
   * @param { string } search - Keyword for data search
   * @param { any } sort - Sort order
   * @param { boolean } withSoft - If set to true, it will retrieve all deleted data
   * @param { number } limit - Data for one page
   * @param { number } offset - Data start
   * @param { boolean } withPagination - Option for pagination
   * @returns { LOV[] }
   */
  async all(
    fields: string[] = [
      "group_name",
      "set_value",
      "description",
      "additional",
      "created_at",
      "updated_at",
      "deleted_at",
    ],
    search: string,
    sort: any,
    withSoft: boolean = false,
    limit: number = 10,
    offset: number = 0,
    withPagination: boolean = true,
  ): Promise<LOV[] | PrimeData<LOV>> {
    try {
      const parameter = JSON.parse(search) ?? {}
      const order = JSON.parse(sort) ?? {
        field: "group_name",
        direction: "ASC",
      }

      return await this.repoLOV.findAll({
        where: parameter,
        fields: fields,
        withSoft: withSoft,
        orderBy: order,
        limit: limit,
        offset: offset,
        withPagination: withPagination,
      })
    } catch (error) {
      throw error
    }
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
      `lov::${payload.group_name}:${hash("sha256", JSON.stringify(payload.set_value))}`,
    )
  }

  /**
   * Update LOV
   *
   * @param { string } id - id for edit
   * @param { DTOUpdateLOV } payload - data for update
   * @returns { void }
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

  /**
   * Delete LOV soft
   *
   * @param { string } id - ID to delete
   * @returns { void }
   */
  async removeSoft(id: string): Promise<void> {
    await this.repoLOV.deleteSoft(id)
  }
}
