import path from 'path'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import { DATABASE_ENTITIES } from '@common/database'

export const ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [...DATABASE_ENTITIES],
  migrations: [path.resolve(__dirname, '..', '*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: path.resolve(__dirname, '..'),
  },
} as PostgresConnectionOptions
