export interface Repository<T> {
  findAll(): Promise<T[]>
  findOne(id: string): Promise<T | null>
  create(entity: T): Promise<T>
  update(id: string, entity: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}
