import { PasswordService } from '@common/security/password.service'

import { faker } from '@faker-js/faker'

describe('PasswordFactory', () => {
  describe('hash()', () => {
    it('should create a hashed password', async () => {
      const password = faker.internet.password()
      const passwordHash = await PasswordService.hash(password)

      expect(passwordHash).toEqual(expect.any(String))
    })
  })

  describe('verify()', () => {
    let password: string
    let passwordHash: string
    beforeEach(async () => {
      password = faker.internet.password()
      passwordHash = await PasswordService.hash(password)
    })

    it('should return true when the provided password matches the hashed password', async () => {
      const verified = await PasswordService.verify(password, passwordHash)

      expect(verified).toEqual(true)
    })

    it('should return false when the provided password does not match the hashed password', async () => {
      const verified = await PasswordService.verify('', passwordHash)

      expect(verified).toEqual(false)
    })
  })
})
