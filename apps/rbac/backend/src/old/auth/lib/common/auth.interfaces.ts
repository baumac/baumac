import { Role } from '@core/auth/lib/common/auth.constants'

export interface AccessTokenPayload {
  username: string
  sub: string
  roles: Role[]
}

export interface AuthToken {
  accessToken: string
}

export interface AuthenticatedUser {
  username: string
  userId: string
  roles: Role[]
}
