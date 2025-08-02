import { Permission, PermissionCreateDto, PermissionsService } from '@core/permissions/lib/common'

import { INestApplication } from '@nestjs/common'

export class PermissionTestFixtureBootstrapper {
  static async bootstrap(app: INestApplication, dto: PermissionCreateDto): Promise<Permission> {
    const service = app.get(PermissionsService)

    return await service.create(dto)
  }
}
