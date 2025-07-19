import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthConfig, InjectAuthConfig } from '@common/config'
import { AccessTokenPayload, AuthenticatedUser } from '@core/auth/lib/common/auth.interfaces'

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectAuthConfig()
    authConfig: AuthConfig
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.JWT_SECRET,
    })
  }

  async validate(payload: AccessTokenPayload): Promise<AuthenticatedUser> {
    return { userId: payload.sub, username: payload.username, role: payload.role }
  }
}
