import { Account } from "@database/schema/account.schema"
import { PrimeData, Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_ACCOUNT } from "@shared/repository"
import { DTOAccountAdd } from "./account.dto.add"

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

  async add(createAccount: DTOAccountAdd) {}
}
