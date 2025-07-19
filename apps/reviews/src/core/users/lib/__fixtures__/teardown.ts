import { Repository } from 'typeorm'

import { User } from '@core/users/lib/common'

import { INestApplication } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'

export class UserTestFixtureTeardowner {
  static async teardown(app: INestApplication, user: User): Promise<void> {
    const repo = app.get<Repository<User>>(getRepositoryToken(User))

    await repo.remove(user)
  }
}
