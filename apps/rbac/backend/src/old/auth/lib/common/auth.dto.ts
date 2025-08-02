import { IsString } from 'class-validator'

import { AuthToken } from '@core/auth/lib/common/auth.interfaces'

export class LoginDto {
  @IsString()
  username: string

  @IsString()
  password: string
}

export class LoginResponseDto {
  access_token: string

  static fromAuthToken(token: AuthToken): LoginResponseDto {
    return {
      access_token: token.accessToken,
    }
  }
}
