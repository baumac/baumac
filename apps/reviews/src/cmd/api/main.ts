import { API_CONFIG, ApiConfig } from '@common/config'

import { AppModule } from './app.module'

import { NestFactory } from '@nestjs/core'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const apiConfig = app.get<ApiConfig>(API_CONFIG)

  await app.listen(apiConfig.API_PORT)
}

void bootstrap()
