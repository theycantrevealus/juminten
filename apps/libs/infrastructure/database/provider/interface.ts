export interface Repository<T> {
  findAll(): Promise<T[]>
  findOne(id: string): Promise<T | null>
  create(entity: T, id?: string): Promise<T>
  update(id: string, entity: Partial<T>): Promise<Partial<T>>
  delete(id: string): Promise<void>
}
