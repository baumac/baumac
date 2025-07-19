import Joi from 'joi'

import { Inject, Module } from '@nestjs/common'
import { ConfigModule, registerAs } from '@nestjs/config'

export const API_CONFIG_NAMESPACE = 'API_CONFIG'

export interface ApiConfig {
  API_PORT: number
}

const ApiConfigSchema = Joi.object({
  API_PORT: Joi.number().port().default(3000),
})

export const ApiConfigRegistration = registerAs<ApiConfig>(API_CONFIG_NAMESPACE, () => ({
  API_PORT: parseInt(process.env.API_PORT),
}))

export const API_CONFIG = ApiConfigRegistration.KEY

export const InjectApiConfig = (): ReturnType<typeof Inject> => Inject(API_CONFIG)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: ApiConfigSchema,
      load: [ApiConfigRegistration],
    }),
  ],
})
export class ApiConfigModule {}
