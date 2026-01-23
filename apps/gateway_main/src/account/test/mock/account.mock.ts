import { Account } from "@database/couchbase/model/account.model"

export const mockAccount = (
  user_id = "xxx",
  core_role = "role-xxx",
  user_name = "e2e",
  first_name = "John",
  last_name = "Doe",
  job_title = "E2E",
  job_level = "1",
  phone = "6285261510202",
  email = "tanaka@ptmitrabhakti.com",
  status = "active",
  line_id = "AC32DV",
  type = "merchant",
  agent = "axios",
  legacy_user_id = "e2e",
): Account => ({
  user_id,
  core_role,
  user_name,
  first_name,
  last_name,
  job_title,
  job_level,
  phone,
  email,
  status,
  line_id,
  type,
  agent,
  legacy_user_id,
})

export const mockAccountModel = {
  new: jest.fn().mockResolvedValue(mockAccount()),
  find: jest.fn().mockImplementation(),
  aggregate: jest.fn().mockImplementation(),
  findOne: jest.fn().mockResolvedValue(mockAccount()),
  findOneAndUpdate: jest.fn().mockResolvedValue(mockAccount()),
  update: jest.fn().mockResolvedValue(mockAccount()),
  create: jest.fn().mockResolvedValue(mockAccount()),
  save: jest.fn().mockImplementation(),
  remove: jest.fn().mockImplementation(),
  removeSoft: jest.fn().mockImplementation(),
  exec: jest.fn().mockImplementation(),
}

export const mockAccountRepository = {
  add: jest.fn().mockResolvedValue(mockAccount()),
  edit: jest.fn().mockImplementation(),
  delete: jest.fn().mockImplementation(),
  deleteSoft: jest.fn().mockImplementation(),
  find: jest.fn().mockResolvedValue([mockAccount()]),
  findById: jest.fn().mockResolvedValue(mockAccount()),
}
