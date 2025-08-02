import { ApiConfigModule, AuthConfigModule, DatabaseConfigModule } from '@common/config'

import { Module } from '@nestjs/common'

@Module({
  imports: [AuthConfigModule, ApiConfigModule, DatabaseConfigModule],
})
export class AppConfigModule {}
