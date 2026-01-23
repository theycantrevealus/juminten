import { Inject, Injectable } from "@nestjs/common"
import { DTOAccountAdd } from "./account.dto.add"
import { RepositoryAccount } from "@database/repository/account.repository"

@Injectable()
export class AccountService {
  constructor(
    @Inject(RepositoryAccount)
    private readonly accountRepo: RepositoryAccount,
  ) {}

  async find() {
    return await this.accountRepo.find({})
  }

  async add(createAccount: DTOAccountAdd) {
    return await this.accountRepo.add(createAccount)
  }
}
