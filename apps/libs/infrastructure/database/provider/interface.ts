import { QueryOptions } from "@database/couchbase/interface"

/**
 * Use this for universal prime data contract
 */
export interface PrimeData<T> {
  data: T[]
  totalRecords: number
  first: number
  rows: number
  totalPages: number
  currentPage: number
}

export interface Repository<T> {
  findAll(options?: QueryOptions): Promise<T[] | PrimeData<T>>
  findOne(id: string): Promise<T | null>
  create(entity: T, id?: string): Promise<T>
  update(id: string, entity: Partial<T>): Promise<Partial<T>>
  delete(id: string): Promise<void>
  deleteSoft(id: string): Promise<void>
}
