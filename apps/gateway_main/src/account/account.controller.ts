import { Body, Controller, Get, Post } from "@nestjs/common"
import { AccountService } from "./account.service"
import { DTOAccountAdd } from "./account.dto.add"

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
}
