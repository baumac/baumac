import Joi from 'joi'

import { Inject, Module } from '@nestjs/common'
import { ConfigModule, registerAs } from '@nestjs/config'

export const AUTH_CONFIG_NAMESPACE = 'AUTH_CONFIG'

export interface AuthConfig {
  JWT_SECRET: string
  JWT_EXPIRATION_MS: number
}

const AuthConfigSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_MS: Joi.number().default(3600000), // Default to 1 hour
})

export const AuthConfigRegistration = registerAs<AuthConfig>(AUTH_CONFIG_NAMESPACE, () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_MS: parseInt(process.env.JWT_EXPIRATION_MS),
}))

export const AUTH_CONFIG = AuthConfigRegistration.KEY

export const InjectAuthConfig = (): ReturnType<typeof Inject> => Inject(AUTH_CONFIG)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: AuthConfigSchema,
      load: [AuthConfigRegistration],
    }),
  ],
})
export class AuthConfigModule {}
