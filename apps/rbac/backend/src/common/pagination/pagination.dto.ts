import { Type } from 'class-transformer'
import { IsInt, IsObject, Max, Min, ValidateNested } from 'class-validator'

import {
  MAX_PAGE_SIZE,
  MIN_PAGE_NUMBER,
  MIN_PAGE_SIZE,
} from '@common/pagination/pagination.constants'

export class PaginationRequestProperties {
  @Max(MAX_PAGE_SIZE)
  @Min(MIN_PAGE_SIZE)
  @IsInt()
  size: number

  @Min(MIN_PAGE_NUMBER)
  @IsInt()
  number: number
}

export class PaginationRequestQueryParameter {
  @ValidateNested()
  @IsObject()
  @Type(() => PaginationRequestProperties)
  page: PaginationRequestProperties
}

export class PaginationResponseMetadata {
  page: {
    number: number
    size: number
    total: number
  }

  static from(number: number, size: number, total: number): PaginationResponseMetadata {
    return {
      page: {
        number,
        size,
        total,
      },
    }
  }
}
