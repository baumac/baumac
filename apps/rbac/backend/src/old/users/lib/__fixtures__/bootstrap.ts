import { User } from '@core/users/lib/common'
import { UserCreateDto } from '@core/users/lib/common/users.dto'
import { UsersService } from '@core/users/lib/common/users.service'

import { INestApplication } from '@nestjs/common'

export class UserTestFixtureBootstrapper {
  static async bootstrap(app: INestApplication, dto: UserCreateDto): Promise<User> {
    const usersService = app.get(UsersService)

    return usersService.create(dto)
  }
}
