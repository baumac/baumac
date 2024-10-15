import { ApiConfig, DatabaseConfig } from '@common/config'

type GlobalAppConfig = ApiConfig & DatabaseConfig

export const appConfig: GlobalAppConfig = {
  API_PORT: 3000,
  POSTGRES_DB: 'ratings',
  POSTGRES_PASSWORD: 'postgres',
  POSTGRES_USERNAME: 'postgres',
  POSTGRES_HOST: 'localhost',
  POSTGRES_PORT: 5432,
  ENABLE_SQL_DEBUG_LOG: false,
}

export function mockConfig(
  currentProcess: NodeJS.Process = process,
  overrides: Partial<GlobalAppConfig> = {}
): void {
  const merged: Partial<GlobalAppConfig> = { ...appConfig, ...overrides }
  const mockEnv = Object.keys(merged).reduce(
    (config, nextKey) => {
      config[nextKey] = String(merged[nextKey as keyof GlobalAppConfig])
      return config
    },
    {} as Record<string, string>
  )

  currentProcess.env = {
    ...currentProcess.env,
    ...mockEnv,
  }
}
