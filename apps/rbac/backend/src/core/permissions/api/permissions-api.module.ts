import { PermissionsController } from '@core/permissions/api/permissions.controller'
import { PermissionsLibModule } from '@core/permissions/lib/common'

import { Module } from '@nestjs/common'

@Module({
  imports: [PermissionsLibModule],
  controllers: [PermissionsController],
})
export class PermissionsApiModule {}
