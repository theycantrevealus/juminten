// import { LOV } from "@database/mongo/schema/lov.schema"
// import { Repository } from "@database/repository/interface"
// import { Injectable } from "@nestjs/common"

// @Injectable()
// export class LOVRepositoryMongoCouchbase implements Repository<LOV> {
//   private bucket: Bucket

//   constructor() {
//     const cluster = new Cluster("couchbase://localhost", {
//       username: "Administrator",
//       password: "password",
//     })
//     this.bucket = cluster.bucket("users")
//   }

//   async findAll(): Promise<LOV[]> {
//     const query = `SELECT u.* FROM \`users\` u`
//     const result = await this.bucket.scope("_default").query(query)
//     return result.rows as LOV[]
//   }

//   async findOne(id: string): Promise<LOV | null> {
//     try {
//       const result = await this.bucket.defaultCollection().get(id)
//       return result.content as LOV
//     } catch {
//       return null
//     }
//   }

//   async create(entity: LOV): Promise<LOV> {
//     await this.bucket.defaultCollection().upsert(entity.id, entity)
//     return entity
//   }

//   async update(id: string, entity: Partial<LOV>): Promise<LOV> {
//     const existing = await this.findOne(id)
//     if (!existing) throw new Error("User not found")
//     const updated = { ...existing, ...entity }
//     await this.bucket.defaultCollection().upsert(id, updated)
//     return updated
//   }

//   async delete(id: string): Promise<void> {
//     await this.bucket.defaultCollection().remove(id)
//   }
// }
