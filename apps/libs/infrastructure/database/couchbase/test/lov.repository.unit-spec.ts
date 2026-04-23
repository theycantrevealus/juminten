import { Test, TestingModule } from "@nestjs/testing"
import { LOVRepositoryCouchbase } from "../repository/lov.repository"
import { CONNECTION_TOKEN } from "../constant"
import { DocumentExistsError } from "couchbase"
import {
  mockCluster,
  mockCollection,
  mockCouchbaseInstance,
} from "./mock.collection"

describe("LOVRepositoryCouchbase", () => {
  let repo: LOVRepositoryCouchbase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LOVRepositoryCouchbase,
        {
          provide: CONNECTION_TOKEN("default"),
          useValue: mockCouchbaseInstance,
        },
      ],
    }).compile()

    repo = module.get(LOVRepositoryCouchbase)
  })

  it("should insert document", async () => {
    mockCouchbaseInstance.generateId.mockReturnValue("generated-id")

    mockCollection.insert.mockResolvedValue({})

    const entity = { name: "test" }

    const result = await repo.create(entity as any, "")

    expect(mockCollection.insert).toHaveBeenCalledWith(
      "generated-id",
      expect.any(Object),
    )
    expect(result).toEqual(entity)
  })

  it("should return data without pagination", async () => {
    mockCouchbaseInstance.buildN1qlQuery.mockReturnValue({
      dataQuery: {
        query: "SELECT * FROM lov",
        params: {},
      },
    })

    mockCluster.query.mockResolvedValue({
      rows: [{ name: "A" }],
    })

    const result = await repo.findAll({})

    expect(mockCluster.query).toHaveBeenCalled()
    expect(result).toEqual([{ name: "A" }])
  })

  it("should return paginated result", async () => {
    mockCouchbaseInstance.buildN1qlQuery.mockReturnValue({
      dataQuery: {
        query: "DATA_QUERY",
        params: { limit: 10, offset: 0 },
      },
      countQuery: {
        query: "COUNT_QUERY",
        params: {},
      },
    })

    mockCluster.query
      .mockResolvedValueOnce({ rows: [{ group_name: "A" }] })
      .mockResolvedValueOnce({ rows: [{ totalRecords: 1 }] })

    const result = await repo.findAll({ withPagination: true })

    expect(result).toMatchObject({
      data: [{ group_name: "A" }],
      totalRecords: 1,
    })
  })

  it("should upsert document", async () => {
    mockCollection.upsert.mockResolvedValue({})

    const result = await repo.update("id1", { group_name: "updated" })

    expect(mockCollection.upsert).toHaveBeenCalledWith(
      "id1",
      expect.objectContaining({ group_name: "updated" }),
    )
  })

  it("should soft delete document", async () => {
    mockCollection.mutateIn.mockResolvedValue({})

    await repo.deleteSoft("id1")

    expect(mockCollection.mutateIn).toHaveBeenCalledWith(
      "id1",
      expect.any(Array),
    )
  })

  it("should throw when document exists", async () => {
    mockCollection.insert.mockRejectedValue(new DocumentExistsError())

    await expect(repo.create({} as any, "id1")).rejects.toThrow(
      "already exists",
    )
  })
})
