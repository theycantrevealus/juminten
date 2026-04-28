import { Role } from "@database/schema/role.schema"
import { PrimeData, Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_ROLE } from "@shared/repository"
import { DTOCreateRole } from "./dto/role.dto.create"
import { DTOUpdateRole } from "./dto/role.dto.update"

@Injectable()
export class RoleService {
  constructor(
    @Inject(REPOSITORY_ROLE)
    private readonly repoRole: Repository<Role>
  ) {}

  /**
   * Return all Roles data partialy by filter, projection, and etc
   *
   * @returns { Role[] }
   */
  async all(config: string): Promise<Role[] | PrimeData<Role>> {
    try {
      const parameter = config?.trim() ? JSON.parse(config) : {}
      return await this.repoRole .findAll({
        where: parameter,
        fields: [
          "role_id",
          "name",
          "desc",
          "authorizes",
          "status",
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
   * Add new Role from FE
   *
   * @param { DTOCreateRole } payload - Role data to create
   * @return { void }
   */
  async add(payload: DTOCreateRole): Promise<void> {
    await this.repoRole.create({
      ...payload,
    })
  }

  /**
   * Update LOV
   *
   * @param { string } id - Role ID
   * @param { DTOUpdateRole } payload
   */
  async update(id: string, payload: DTOUpdateRole): Promise<void> {
    await this.repoRole.update(id, payload)
  }

  /**
   * Hard-delete Role
   *
   * @param { string } id - Role ID
   */
  async remove(id: string): Promise<void> {
    await this.repoRole.delete(id)
  }

  /**
   * Soft-delete Role
   *
   * @param { string } id - Role ID
   */
  async removeSoft(id: string): Promise<void> {
    await this.repoRole.deleteSoft(id)
  }
}
