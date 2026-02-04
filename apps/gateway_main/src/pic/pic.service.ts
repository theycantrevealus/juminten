import { PIC } from "@database/schema/pic.schema"
import { Repository } from "@database/provider/interface"
import { Inject, Injectable } from "@nestjs/common"
import { REPOSITORY_PIC } from "@shared/repository"
import { DTOCreatePIC } from "./pic.dto.create"
import { DTOUpdatePIC } from "./pic.dto.update"
import { TimeManagement } from "@util/time"

@Injectable()
export class PICService {
    constructor(
        @Inject(REPOSITORY_PIC)
        private readonly repoPIC: Repository<PIC>,
    ) { }

    /**
     * Return all PIC data partially by filter, projection, and etc
     *
     * @returns { PIC[] }
     */
    async all(config = {}): Promise<PIC[]> {
        return await this.repoPIC.findAll({
            select: [
                "META().id",
                "email",
                "msisdn",
                "name",
                "created_by",
                "created_at",
                "updated_at",
            ],
            orderBy: {
                field: "name",
                direction: "ASC",
            },
            limit: 10,
            offset: 0,
        })
    }

    /**
     * Add new PIC
     *
     * @param { DTOCreatePIC } payload - PIC data to create
     * @param { any } createdBy - User who creates this record
     * @returns { void }
     */
    async create(payload: DTOCreatePIC, createdBy: any): Promise<void> {
        const timeManagement = new TimeManagement()
        const now = timeManagement.getTimezone("Asia/Jakarta")

        await this.repoPIC.create(
            {
                ...payload,
                created_by: createdBy,
                created_at: now,
                updated_at: now,
                deleted_at: null,
            },
            `pic::${payload.msisdn}`,
        )
    }

    /**
     * Update PIC
     *
     * @param { string } id - ID to update
     * @param { DTOUpdatePIC } payload - PIC data to update
     */
    async update(id: string, payload: DTOUpdatePIC): Promise<void> {
        const timeManagement = new TimeManagement()
        const now = timeManagement.getTimezone("Asia/Jakarta")

        // Get existing data first
        const existingData = await this.repoPIC.findOne(id)

        // Merge existing data with new payload and update timestamp
        await this.repoPIC.update(id, {
            ...existingData,
            ...payload,
            updated_at: now,
        })
    }

    /**
     * Delete PIC
     *
     * @param { string } id - ID to delete
     * @returns { void }
     */
    async remove(id: string): Promise<void> {
        await this.repoPIC.delete(id)
    }
}
