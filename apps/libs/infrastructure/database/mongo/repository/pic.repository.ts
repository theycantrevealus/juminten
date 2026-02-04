import { Repository } from "@database/provider/interface"
import { Injectable } from "@nestjs/common"
import { PIC, PicDocument } from "../schema/pic.schema"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

@Injectable()
export class PICRepositoryMongo implements Repository<PIC> {
    constructor(@InjectModel(PIC.name) private picModel: Model<PicDocument>) { }

    findAll(): Promise<PIC[]> {
        throw new Error("Method not implemented.")
    }

    findOne(id: string): Promise<PIC> {
        throw new Error("Method not implemented.")
    }

    create(entity: PIC): Promise<PIC> {
        throw new Error("Method not implemented.")
    }

    update(id: string, entity: Partial<PIC>): Promise<PIC> {
        throw new Error("Method not implemented.")
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }
}
