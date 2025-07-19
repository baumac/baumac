import { mock, mockClear, mockDeep } from 'jest-mock-extended'

import { ExceptionLoggerFilter } from '@common/exceptions/exception-logger.filter'

import { faker } from '@faker-js/faker'
import {
  ArgumentsHost,
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  GoneException,
  HttpException,
  HttpStatus,
  HttpVersionNotSupportedException,
  ImATeapotException,
  InternalServerErrorException,
  LoggerService,
  MethodNotAllowedException,
  MisdirectedException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  PayloadTooLargeException,
  PreconditionFailedException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface'
import { HttpAdapterHost } from '@nestjs/core/helpers/http-adapter-host'

describe('ExceptionLoggerFilter Unit Tests', () => {
  let exceptionLoggerFilter: ExceptionLoggerFilter
  const mockArgumentsHost = mockDeep<ArgumentsHost>({ funcPropSupport: true })
  const mockHttpArgumentsHost = mock<HttpArgumentsHost>()
  const mockHttpAdapterHost = mockDeep<HttpAdapterHost>({ funcPropSupport: true })
  const mockLogger = mock<LoggerService>()
  const fakeRequestUrl = faker.internet.url()

  beforeAll(() => {
    exceptionLoggerFilter = new ExceptionLoggerFilter(mockHttpAdapterHost, mockLogger)
  })

  afterEach(() => {
    mockClear(mockLogger)
  })

  describe('catch()', () => {
    describe('HttpException', () => {
      beforeEach(() => {
        mockHttpAdapterHost.httpAdapter.getRequestUrl.mockReturnValue(fakeRequestUrl)
        mockArgumentsHost.switchToHttp.mockReturnValue(mockHttpArgumentsHost)
      })

      afterEach(() => {
        mockClear(mockArgumentsHost)
        mockClear(mockHttpAdapterHost)
      })

      describe('4XX exceptions', () => {
        it(`should log ${HttpStatus.UNAUTHORIZED} exceptions at the debug level`, () => {
          const e = new UnauthorizedException('Unauthorized')

          exceptionLoggerFilter.catch(e, mockArgumentsHost)

          expect(mockLogger.debug).toHaveBeenCalledWith(
            `Caught ${HttpStatus.UNAUTHORIZED} response. Path: ${fakeRequestUrl}. Error: ${JSON.stringify(e)}.`
          )
        })

        it.each([
          [
            new BadRequestException(),
            new ForbiddenException(),
            new ConflictException(),
            new NotFoundException(),
            new MethodNotAllowedException(),
            new NotAcceptableException(),
            new RequestTimeoutException(),
            new GoneException(),
            new PayloadTooLargeException(),
            new UnsupportedMediaTypeException(),
            new ImATeapotException(),
            new MisdirectedException(),
            new UnprocessableEntityException(),
            new PreconditionFailedException(),
            new HttpException('rip', 499),
          ],
        ])(
          `should log 4XX exceptions that are not ${HttpStatus.UNAUTHORIZED} exceptions at the info level`,
          (e: HttpException) => {
            exceptionLoggerFilter.catch(e, mockArgumentsHost)

            expect(mockLogger.log).toHaveBeenCalledWith(
              `Caught ${e.getStatus()} response. Path: ${fakeRequestUrl}. Error: ${JSON.stringify(e)}.`
            )
          }
        )
      })

      describe('5XX exceptions', () => {
        it.each([
          [
            new InternalServerErrorException(),
            new NotImplementedException(),
            new BadGatewayException(),
            new ServiceUnavailableException(),
            new GatewayTimeoutException(),
            new HttpVersionNotSupportedException(),
          ],
        ])(`should log the exception at the error level`, (e: HttpException) => {
          exceptionLoggerFilter.catch(e, mockArgumentsHost)

          expect(mockLogger.error).toHaveBeenCalledWith(
            `An unhandled exception was caught. Path: ${fakeRequestUrl}. Error: ${JSON.stringify(e)}.`
          )
        })
      })
    })

    describe('Non HttpException', () => {
      it('should log the exception at the error level', () => {
        const e = new Error('rip')

        exceptionLoggerFilter.catch(e, mockArgumentsHost)

        expect(mockLogger.error).toHaveBeenCalledWith(
          `An unhandled exception was caught. Error: ${JSON.stringify(e)}.`
        )
      })
    })
  })
})
