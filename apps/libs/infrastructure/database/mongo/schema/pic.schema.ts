import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { TimeManagement } from "@util/time"
import { Type } from "class-transformer"
import mongoose, { Document, SchemaTypes } from "mongoose"
import { Account } from "./account.schema"

export type PicDocument = PIC & Document

@Schema()
export class PIC {
    @Prop({
        type: SchemaTypes.String,
        required: true,
        minlength: 6,
        validate: {
            validator: (v: string) => /^[a-zA-Z]+$/.test(v),
            message: "Name must contain only alphabetic characters",
        },
    })
    name: string

    @Prop({
        type: SchemaTypes.String,
        required: true,
        minlength: 11,
        maxlength: 14,
    })
    msisdn: string

    @Prop({
        type: SchemaTypes.String,
        required: true,
        minlength: 8,
        validate: {
            validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: "Invalid email format",
        },
    })
    email: string

    @Prop({ type: mongoose.Schema.Types.Mixed, ref: Account.name, required: true })
    @Type(() => Account)
    created_by: any | null

    @Prop({
        type: SchemaTypes.Date,
        default: () => new TimeManagement().getTimezone("Asia/Jakarta"),
    })
    created_at: Date

    @Prop({
        type: SchemaTypes.Date,
        default: () => new TimeManagement().getTimezone("Asia/Jakarta"),
    })
    updated_at: Date

    @Prop({ type: SchemaTypes.Mixed, default: null })
    deleted_at: Date | null
}

export const PicSchema = SchemaFactory.createForClass(PIC)
