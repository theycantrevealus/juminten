import { Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { LOV } from "../../schema/lov.schema"
import { Cluster } from "couchbase"
import { CONNECTION_TOKEN } from "../contant"

@Injectable()
export class LOVRepositoryCouchbase implements Repository<LOV> {
  constructor(
    @Inject(CONNECTION_TOKEN("default"))
    private readonly cluster: Cluster,
  ) {}

  async findAll(): Promise<LOV[]> {
    const keyspace = `\`testing\`.\`default\`.\`cat\``
    const queryStatement = `SELECT id, name, breed FROM ${keyspace} LIMIT 10`

    const result = await this.cluster.query<LOV>(queryStatement)
    return result.rows
  }

  findOne(id: string): Promise<LOV> {
    throw new Error("Method not implemented.")
  }
  create(entity: LOV): Promise<LOV> {
    throw new Error("Method not implemented.")
  }
  update(id: string, entity: Partial<LOV>): Promise<LOV> {
    throw new Error("Method not implemented.")
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
