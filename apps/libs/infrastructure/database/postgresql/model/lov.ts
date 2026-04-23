import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class LOVModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  group_name!: string

  @Column()
  set_value!: any

  @Column({ default: "-" })
  description: string = ""

  @Column()
  additional: any
}
