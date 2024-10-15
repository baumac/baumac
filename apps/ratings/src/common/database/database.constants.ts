// todo uncomment the below line
// import path from 'path'

import { DATABASE_ENTITIES as AUTH_DATABASE_ENTITIES } from '@common/auth/auth.constants'

export const CONNECTION_TIMEOUT_MS = 5000
export const STATEMENT_TIMEOUT_MS = 5000
export const QUERY_TIMEOUT_MS = 5000
export const IDLE_IN_TXN_SESSION_TIMEOUT_MS = 10000

export const DATABASE_ENTITIES = [
  // todo uncomment the below line
  // path.resolve(__dirname, '..', '..', 'core', '**/*.entity{.ts,.js}'),
  ...AUTH_DATABASE_ENTITIES,
]
