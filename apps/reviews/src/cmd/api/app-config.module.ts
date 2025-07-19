import { ApiConfigModule, DatabaseConfigModule } from '@common/config'

import { Module } from '@nestjs/common'

@Module({
  imports: [ApiConfigModule, DatabaseConfigModule],
})
export class AppConfigModule {}
