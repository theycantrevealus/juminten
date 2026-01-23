import { Repository } from "@database/repository/interface"
import { Injectable } from "@nestjs/common"
import { LOV, LovDocument } from "../schema/lov.schema"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

@Injectable()
export class LOVRepositoryMongo implements Repository<LOV> {
  constructor(@InjectModel(LOV.name) private userModel: Model<LovDocument>) {}

  findAll(): Promise<LOV[]> {
    throw new Error("Method not implemented.")
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
