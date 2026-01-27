import { Account } from "@database/couchbase/model/account.model"
import { Injectable } from "@nestjs/common"
import { CouchBaseModel, InjectModel } from "nestjs-couchbase"

@Injectable()
export class RepositoryAccount {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: CouchBaseModel<Account>,
  ) {}

  async add(account: Account): Promise<any> {
    try {
      return await this.accountModel.create(account)
    } catch (e) {
      console.error(e)
    }
  }

  async edit(id: string, account: Account): Promise<void> {
    await this.accountModel.update(id, account)
  }

  async delete(id: string): Promise<void> {
    await this.accountModel.remove(id)
  }

  async deleteSoft(id: string): Promise<void> {
    await this.accountModel.removeSoft(id)
  }

  async find(filter: any, options: any = {}): Promise<Account[] | null> {
    return await this.accountModel.find(filter, options)
  }

  async findById(id: string): Promise<Account | null> {
    return await this.accountModel.findById(id)
  }
}
