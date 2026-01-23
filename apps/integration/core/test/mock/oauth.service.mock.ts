export const mockOAuthService = {
  signIn: jest.fn().mockResolvedValue({
    access_token: "",
  }),
}
