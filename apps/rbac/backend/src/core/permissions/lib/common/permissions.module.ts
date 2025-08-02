import { PermissionsService } from '@core/permissions/lib/common/permissions.service'

import { Module } from '@nestjs/common'

@Module({
  imports: [],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsLibModule {}
