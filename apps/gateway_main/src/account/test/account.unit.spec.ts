import { Test, TestingModule } from "@nestjs/testing"
import { AccountService } from "../account.service"
import { CouchBaseModel, getModelToken } from "nestjs-couchbase"
import { Account } from "@repository/couchbase/model/account.model"
import { mockAccountModel, mockAccountRepository } from "./mock/account.mock"
import { RepositoryAccount } from "@repository/repository/account.repository"
import { DTOAccountAdd } from "../account.dto.add"

describe("Account Service", () => {
  let accountService: AccountService
  let accountRepository: RepositoryAccount

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        AccountService,
        { provide: RepositoryAccount, useValue: mockAccountRepository },
        {
          provide: getModelToken(Account.name),
          useValue: mockAccountModel,
        },
      ],
    }).compile()

    accountService = module.get<AccountService>(AccountService)
    accountRepository = module.get<RepositoryAccount>(RepositoryAccount)
  })

  it("Should start service", () => {
    expect(accountService).toBeDefined()
  })

  it("Should call account repository to find data", async () => {
    await accountService.find().then(() => {
      expect(accountRepository.find).toHaveBeenCalled()
    })
  })

  it("Should call account repository to add data", async () => {
    await accountService
      .add({
        user_id: "xxx",
        core_role: "role-xxx",
        user_name: "e2e",
        first_name: "John",
        last_name: "Doe",
        job_title: "E2E",
        job_level: "1",
        phone: "6285261510202",
        email: "tanaka@ptmitrabhakti.com",
        line_id: "AC32DV",
        status: "active",
        type: "merchant",
        agent: "axios",
        legacy_user_id: "e2e",
      })
      .then(() => {
        expect(accountRepository.add).toHaveBeenCalled()
      })
  })
})
