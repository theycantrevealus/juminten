import { Account } from "@database/schema/account.schema"
import { PrimeData, Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_ACCOUNT } from "@shared/repository"
import { DTOCreateAccount } from "./dto/account.dto.create"
import { DTOUpdateAccount } from "./dto/account.dto.update"

@Injectable()
export class AccountService {
  constructor(
    @Inject(REPOSITORY_ACCOUNT)
    private readonly repoAccount: Repository<Account>
  ) {}

  /**
   * Return all accounts data partialy by filter, projection, and etc
   *
   * @returns { Account[] }
   */
  async all(config: string): Promise<Account[] | PrimeData<Account>> {
    try {
      const parameter = config?.trim() ? JSON.parse(config) : {}
      return await this.repoAccount.findAll({
        where: parameter,
        fields: [
          "user_name",
          "first_name",
          "last_name",
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
   * Add new Account from FE
   *
   * @param { DTOCreateAccount } payload - Account data to create
   * @return { void }
   */
  async add(payload: DTOCreateAccount): Promise<void> {
    await this.repoAccount.create({
      ...payload,
      role: "merchant"
    })
  }

  /**
   * Update LOV
   *
   * @param { string } id - Account ID
   * @param { DTOUpdateAccount } payload
   */
  async update(id: string, payload: DTOUpdateAccount): Promise<void> {
    await this.repoAccount.update(id, payload)
  }

  /**
   * Hard-delete account
   *
   * @param { string } id - Account ID
   */
  async remove(id: string): Promise<void> {
    await this.repoAccount.delete(id)
  }

  /**
   * Soft-delete account
   *
   * @param { string } id - Account ID
   */
  async removeSoft(id: string): Promise<void> {
    await this.repoAccount.deleteSoft(id)
  }
}
