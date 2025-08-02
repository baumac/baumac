import { DATABASE_CONFIG, DatabaseConfig, DatabaseConfigModule } from '@common/config'
import {
  CONNECTION_TIMEOUT_MS,
  DATABASE_ENTITIES,
  IDLE_IN_TXN_SESSION_TIMEOUT_MS,
  QUERY_TIMEOUT_MS,
  STATEMENT_TIMEOUT_MS,
} from '@common/database/database.constants'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DATABASE_CONFIG],
      useFactory: (dbConfig: DatabaseConfig) => ({
        type: 'postgres',
        host: dbConfig.POSTGRES_HOST,
        port: dbConfig.POSTGRES_PORT,
        username: dbConfig.POSTGRES_USERNAME,
        password: dbConfig.POSTGRES_PASSWORD,
        database: dbConfig.POSTGRES_DB,
        logging: dbConfig.ENABLE_SQL_DEBUG_LOG,
        entities: [...DATABASE_ENTITIES],
        synchronize: false,
        extra: {
          connectTimeoutMS: CONNECTION_TIMEOUT_MS,
          idle_in_transaction_session_timeout: IDLE_IN_TXN_SESSION_TIMEOUT_MS,
          query_timeout: QUERY_TIMEOUT_MS,
          statement_timeout: STATEMENT_TIMEOUT_MS,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
