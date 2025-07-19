import { DatabaseModule } from '@common/database'
import { ExceptionsModule } from '@common/exceptions'
import { ValidationModule } from '@common/validation'
import { AppModule as CoreAppModule } from '@core/app'

import { AppConfigModule } from './app-config.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [AppConfigModule, CoreAppModule, DatabaseModule, ExceptionsModule, ValidationModule],
})
export class AppModule {}
