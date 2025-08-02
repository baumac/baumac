import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import {
  MAX_PAGE_SIZE,
  MIN_PAGE_NUMBER,
  MIN_PAGE_SIZE,
} from '@common/pagination/pagination.constants'
import {
  PaginationRequestQueryParameter,
  PaginationResponseMetadata,
} from '@common/pagination/pagination.dto'

describe('Pagination DTO Unit Tests', () => {
  describe('PaginationRequestParameters', () => {
    it.each([
      ['page is not defined', {}],
      ['page is an empty object', { page: {} }],
      ['page size is not provided', { page: { number: 1 } }],
      ['page size is not a number', { page: { size: 'not-a-number', number: 1 } }],
      ['page size is less than MIN_PAGE_SIZE', { page: { size: MIN_PAGE_SIZE - 1, number: 1 } }],
      ['page size is greater than MAX_PAGE_SIZE', { page: { size: MAX_PAGE_SIZE + 1, number: 1 } }],
      ['page number is not provided', { page: { size: 10 } }],
      ['page number is not a number', { page: { size: 10, number: 'not-a-number' } }],
      [
        'page number is less than MIN_PAGE_NUMBER',
        { page: { size: 10, number: MIN_PAGE_NUMBER - 1 } },
      ],
    ])('should fail to validate if %s', async (_name, value) => {
      const dto = plainToInstance(PaginationRequestQueryParameter, value)

      await expect(validate(dto)).resolves.toHaveLength(1)
    })

    it('should successfully validate DTO', async () => {
      const value: PaginationRequestQueryParameter = {
        page: {
          size: 10,
          number: 1,
        },
      }

      const dto = plainToInstance(PaginationRequestQueryParameter, value)

      await expect(validate(dto)).resolves.toHaveLength(0)
    })
  })

  describe('PaginationResponseMetadata', () => {
    it('should return the correct metadata for pagination', () => {
      const size = 1
      const number = 1
      const total = 100

      expect(PaginationResponseMetadata.from(number, size, total)).toEqual({
        page: {
          size,
          number,
          total,
        },
      })
    })
  })
})
