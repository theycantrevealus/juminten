export const mockCollection = {
  insert: jest.fn(),
  upsert: jest.fn(),
  remove: jest.fn(),
  mutateIn: jest.fn(),
}

export const mockBucket = {
  collection: jest.fn().mockReturnValue(mockCollection),
}

export const mockCluster = {
  query: jest.fn(),
}

export const mockCouchbaseInstance = {
  getBucket: jest.fn().mockReturnValue(mockBucket),
  getCluster: jest.fn().mockReturnValue(mockCluster),
  buildN1qlQuery: jest.fn(),
  generateId: jest.fn(),
  hashId: jest.fn(),
}
