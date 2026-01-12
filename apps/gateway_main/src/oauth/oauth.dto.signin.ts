import { IsString } from "class-validator"

export class DTOSignIn {
  @IsString()
  locale: string

  @IsString()
  type: string

  @IsString()
  username: string

  @IsString()
  password: string

  @IsString()
  client_id: string

  @IsString()
  client_secret: string
}
