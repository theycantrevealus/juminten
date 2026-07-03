import { vi } from "vitest"

export const mockOAuthService = {
  signIn: vi.fn().mockResolvedValue({
    access_token: "",
  }),
}
