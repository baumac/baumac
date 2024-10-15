import { DatabaseModule } from '@common/database'
import { AppModule as CoreAppModule } from '@core/app'

import { AppConfigModule } from './app-config.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [AppConfigModule, CoreAppModule, DatabaseModule],
})
export class AppModule {}
