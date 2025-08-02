import request from 'supertest'
import TestAgent from 'supertest/lib/agent'

import { DatabaseConfigModule } from '@common/config'
import { DatabaseModule } from '@common/database'
import { ValidationModule } from '@common/validation'
import { PermissionsApiModule } from '@core/permissions/api/permissions-api.module'

import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

describe('PermissionsApiModule Component Tests', () => {
  let api: TestAgent
  let app: INestApplication

  const baseUrl = '/v1/permissions'

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [DatabaseConfigModule, DatabaseModule, ValidationModule, PermissionsApiModule],
    }).compile()

    const app = moduleRef.createNestApplication()
    await app.init()

    api = request(app.getHttpServer())
  })

  beforeEach(() => {})

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await app?.close()
  })

  describe(`Get ${baseUrl}`, () => {
    it('should return an empty array when there are no permissions', async () => {
      const response = await api
        .get(`${baseUrl}?page[number]=1&page[size]=1`)
        // .set(getAuthBearerTokenHeader(user))
        .expect(HttpStatus.OK)

      expect(response.body).toEqual({
        data: [],
        meta: { page: { total: 0, number: 1, size: 1 } },
      })
    })

    it.todo('should return an array of paginated permissions')

    it.todo('should return an array of paginated permissions with the given page size')

    it.todo('should return an array of paginated permissions with the given page number')
  })

  describe(`POST ${baseUrl}`, () => {})

  describe(`GET ${baseUrl}/:id`, () => {})

  describe(`PATCH ${baseUrl}/:id`, () => {})

  describe(`DELETE ${baseUrl}/:id`, () => {})
})
