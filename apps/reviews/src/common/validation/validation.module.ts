import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: (): ValidationPipe => {
        return new ValidationPipe({
          transform: true,
        })
      },
    },
  ],
})
export class ValidationModule {}
