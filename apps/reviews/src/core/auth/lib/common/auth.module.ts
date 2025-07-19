import { AUTH_CONFIG, AuthConfig, AuthConfigModule } from '@common/config'
import { AuthService } from '@core/auth/lib/common/auth.service'
import { JwtAuthStrategy } from '@core/auth/lib/common/jwt-auth.strategy'
import { UsersLibModule } from '@core/users/lib/common/users.module'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    UsersLibModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AUTH_CONFIG],
      useFactory: async (authConfig: AuthConfig) => ({
        secret: authConfig.JWT_SECRET,
        signOptions: { expiresIn: authConfig.JWT_EXPIRATION_MS },
      }),
    }),
  ],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService],
})
export class AuthLibModule {}
