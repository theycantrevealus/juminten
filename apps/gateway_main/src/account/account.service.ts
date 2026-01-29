import { Injectable } from "@nestjs/common"
import { DTOAccountAdd } from "./account.dto.add"

@Injectable()
export class AccountService {
  constructor() {}

  async find() {
    //
  }

  async add(createAccount: DTOAccountAdd) {
    //
  }
}
