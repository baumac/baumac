import { AuthService } from '@core/auth/lib/common'
import { LoginDto, LoginResponseDto } from '@core/auth/lib/common/auth.dto'
import { JwtAuthGuard } from '@core/auth/lib/common/jwt-auth.guard'

import { Body, Controller, Logger, LoggerService, Optional, Post, UseGuards } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Optional()
    private readonly logger: LoggerService = new Logger(AuthService.name)
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    this.logger.log(`Auth login attempt for user: ${dto}`)

    const token = await this.authService.login(dto.username, dto.password)

    return LoginResponseDto.fromAuthToken(token)
  }
}
