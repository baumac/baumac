import { UsersService } from '@core/users/lib/v1/users.service'

import { Module } from '@nestjs/common'

@Module({
  imports: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersLibModule {}
