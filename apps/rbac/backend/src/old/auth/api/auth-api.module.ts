import { AuthController } from '@core/auth/api/auth.controller'
import { AuthLibModule } from '@core/auth/lib/common'
import { UsersLibModule } from '@core/users/lib/common/users.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [UsersLibModule, AuthLibModule],
  controllers: [AuthController],
})
export class AuthApiModule {}
