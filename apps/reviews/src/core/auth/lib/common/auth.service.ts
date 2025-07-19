import { PasswordService } from 'src/common/security'

import { AccessTokenPayload, AuthToken } from '@core/auth/lib/common/auth.interfaces'
import { UsersService } from '@core/users/lib/common/users.service'

import { Injectable, Logger, LoggerService, Optional, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Optional()
    private readonly logger: LoggerService = new Logger(AuthService.name)
  ) {}

  async login(username: string, password: string): Promise<AuthToken> {
    const user = await this.usersService.findOneByUsername(username)
    if (user && (await PasswordService.verify(password, user.password_hash))) {
      const payload: AccessTokenPayload = { username: user.username, sub: user.id, role: user.role }
      return {
        accessToken: this.jwtService.sign(payload),
      }
    }

    throw new UnauthorizedException()
  }
}
