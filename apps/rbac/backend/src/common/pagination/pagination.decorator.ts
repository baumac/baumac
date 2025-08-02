import { PaginationRequestProperties } from '@common/pagination/pagination.dto'

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const PaginationParams = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()

  const params: PaginationRequestProperties = {
    number: request.query['page[number]'],
    size: request.query['page[size]'],
  }

  return params
})
