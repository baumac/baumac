import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: (): ValidationPipe => {
        return new ValidationPipe({
          transform: true,
          transformOptions: { enableImplicitConversion: true },
          forbidNonWhitelisted: true,
          validateCustomDecorators: true,
        })
      },
    },
  ],
})
export class ValidationModule {}
