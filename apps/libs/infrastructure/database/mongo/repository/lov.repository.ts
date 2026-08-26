import { Repository } from "@database/provider/interface"
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
    throw new Error(`Method not implemented. ${id}`)
  }
  create(entity: LOV): Promise<LOV> {
    throw new Error(`Method not implemented. ${entity}`)
  }
  update(id: string, entity: Partial<LOV>): Promise<LOV> {
    throw new Error(`Method not implemented. ${id} ${entity}`)
  }
  delete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`)
  }
  deleteSoft(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`)
  }
}
