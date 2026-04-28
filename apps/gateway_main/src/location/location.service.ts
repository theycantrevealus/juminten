import { Location } from "@database/schema/location.schema"
import { PrimeData, Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_LOCATION } from "@shared/repository"
import { DTOCreateLocation } from "./dto/location.dto.create"
import { DTOUpdateLocation } from "./dto/location.dto.update"

@Injectable()
export class LocationService {
  constructor(
    @Inject(REPOSITORY_LOCATION)
    private readonly repoLocation: Repository<Location>
  ) {}

  /**
   * Return all Locations data partialy by filter, projection, and etc
   *
   * @returns { Location[] }
   */
  async all(config: string): Promise<Location[] | PrimeData<Location>> {
    try {
      const parameter = config?.trim() ? JSON.parse(config) : {}
      return await this.repoLocation.findAll({
        where: parameter,
        fields: [
          "code",
          "data_source",
          "adhoc_group",
          "name",
          "type",
          "parent",
          "lac",
          "cell_id",
          "longitude",
          "latitude",
          "area",
          "prov",
          "region",
          "city",
          "area_id",
          "prov_id",
          "region_id",
          "city_id",
          "status",
          "timezone",
          "region_detail",
          "prov_detai",
          "city_detail",
          "created_by",
          "created_at",
          "updated_at",
          "deleted_at",
        ],
        withSoft: true,
        orderBy: {
          field: "created_at",
          direction: "DESC",
        },
        limit: 10,
        offset: 0,
        withPagination: true,
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Add new Location from FE
   *
   * @param { DTOCreateLocation } payload - Location data to create
   * @return { void }
   */
  async add(payload: DTOCreateLocation): Promise<void> {
    await this.repoLocation.create({
      ...payload
    })
  }

  /**
   * Update Location
   *
   * @param { string } id - Location ID
   * @param { DTOUpdateLocation } payload
   */
  async update(id: string, payload: DTOUpdateLocation): Promise<void> {
    await this.repoLocation.update(id, payload)
  }

  /**
   * Hard-delete Location
   *
   * @param { string } id - Location ID
   */
  async remove(id: string): Promise<void> {
    await this.repoLocation.delete(id)
  }

  /**
   * Soft-delete Location
   *
   * @param { string } id - Location ID
   */
  async removeSoft(id: string): Promise<void> {
    await this.repoLocation.deleteSoft(id)
  }
}
