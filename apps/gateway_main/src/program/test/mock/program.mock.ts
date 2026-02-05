import { Program, ProgramTimeZone } from "@database/schema/program.schema"

export const mockProgram: Program = {
    name: "TestProgram",
    desc: "Test Description",
    program_time_zone: ProgramTimeZone.WIB,
    start_period: "2026-01-01T00:00:00.000+07:00",
    end_period: "2026-12-31T23:59:59.000+07:00",
    keyword_registration: "TESTREG",
    point_registration: 100,
    whitelist_counter: false,
    program_notification: [
        {
            template: "welcome_template",
            template_content: "Welcome to the program!",
        },
    ],
    is_draft: false,
    is_stoped: false,
    need_review_after_edit: false,
    created_by: {
        user_profile: { user_id: "admin-001", user_name: "Admin" },
        authorizes: [],
    },
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
}

export const mockProgramArray: Program[] = [
    mockProgram,
    {
        ...mockProgram,
        name: "SecondProgram",
        desc: "Second Test Description",
    },
]

export const mockProgramRepository = {
    findAll: jest.fn().mockResolvedValue(mockProgramArray),
    findOne: jest.fn().mockResolvedValue(mockProgram),
    findByName: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(mockProgram),
    update: jest.fn().mockResolvedValue(mockProgram),
    delete: jest.fn().mockResolvedValue(undefined),
    deleteSoft: jest.fn().mockResolvedValue(undefined),
}
