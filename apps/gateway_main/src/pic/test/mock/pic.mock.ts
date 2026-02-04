import { PIC } from "@database/schema/pic.schema"

export const mockPIC = (
    name = "JohnDoe",
    msisdn = "08123456789012",
    email = "john@example.com",
    created_by = { user_id: "user-123", user_name: "admin" },
    created_at = new Date(),
    updated_at = new Date(),
    deleted_at: Date | null = null,
): PIC => ({
    name,
    msisdn,
    email,
    created_by,
    created_at,
    updated_at,
    deleted_at,
})

export const mockPICRepository = {
    findAll: jest.fn().mockResolvedValue([mockPIC()]),
    findOne: jest.fn().mockResolvedValue(mockPIC()),
    create: jest.fn().mockResolvedValue(mockPIC()),
    update: jest.fn().mockResolvedValue(mockPIC()),
    delete: jest.fn().mockResolvedValue(undefined),
}
