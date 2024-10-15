import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  LoggerService,
  Optional,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class ExceptionLoggerFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Optional()
    private readonly logger: LoggerService = new Logger(ExceptionLoggerFilter.name)
  ) {}

  catch(e: unknown, host: ArgumentsHost): void {
    if (e instanceof HttpException) {
      this.handleHttpException(e, host)
    } else {
      this.logger.error(`An unhandled exception was caught. Error: ${JSON.stringify(e)}.`)
    }
  }

  private handleHttpException(e: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()

    const status = e.getStatus()
    const path = httpAdapter.getRequestUrl(request)

    if ([HttpStatus.UNAUTHORIZED].includes(status)) {
      this.logger.debug?.(`Caught ${status} response. Path: ${path}. Error: ${JSON.stringify(e)}.`)
    } else if (status >= HttpStatus.BAD_REQUEST && status < HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.log(`Caught ${status} response. Path: ${path}. Error: ${JSON.stringify(e)}.`)
    } else {
      this.logger.error(
        `An unhandled exception was caught. Path: ${path}. Error: ${JSON.stringify(e)}.`
      )
    }
  }
}
