import path from 'path'

export const CONNECTION_TIMEOUT_MS = 5000
export const STATEMENT_TIMEOUT_MS = 5000
export const QUERY_TIMEOUT_MS = 5000
export const IDLE_IN_TXN_SESSION_TIMEOUT_MS = 10000

export const DATABASE_ENTITIES = [
  path.resolve(__dirname, '..', '..', 'core', '**/*.entity{.ts,.js}'),
]
