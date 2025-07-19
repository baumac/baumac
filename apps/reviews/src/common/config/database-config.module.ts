import Joi from 'joi'
import * as process from 'node:process'

import { Inject, Module } from '@nestjs/common'
import { ConfigModule, registerAs } from '@nestjs/config'

export const DATABASE_CONFIG_NAMESPACE = 'DATABASE_CONFIG'

export interface DatabaseConfig {
  POSTGRES_HOST: string
  POSTGRES_PORT: number
  POSTGRES_USERNAME: string
  POSTGRES_PASSWORD: string
  POSTGRES_DB: string
  ENABLE_SQL_DEBUG_LOG: boolean
}

const DatabaseConfigSchema = Joi.object({
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().port().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  ENABLE_SQL_DEBUG_LOG: Joi.boolean().default(false),
})

export const DatabaseConfigRegistration = registerAs<DatabaseConfig>(
  DATABASE_CONFIG_NAMESPACE,
  () => ({
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT),
    POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    ENABLE_SQL_DEBUG_LOG: process.env.ENABLE_SQL_DEBUG_LOG.toLowerCase() === 'true',
  })
)

export const DATABASE_CONFIG = DatabaseConfigRegistration.KEY

export const InjectDatabaseConfig = (): ReturnType<typeof Inject> => Inject(DATABASE_CONFIG)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: DatabaseConfigSchema,
      load: [DatabaseConfigRegistration],
    }),
  ],
})
export class DatabaseConfigModule {}
