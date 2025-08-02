import { Repository } from 'typeorm'

import { Permission } from '@core/permissions/lib/common'

import { INestApplication } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'

export class PermissionTestFixtureTeardowner {
  static async teardown(app: INestApplication, entity: Permission): Promise<void> {
    const repo = app.get<Repository<Permission>>(getRepositoryToken(Permission))

    await repo.remove(entity)
  }
}
