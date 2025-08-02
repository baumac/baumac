import { randomBytes, scrypt, timingSafeEqual } from 'crypto'
import { promisify } from 'util'

const scryptPromise = promisify(scrypt)

const DEFAULT_SALT_BYTES = 16
const DEFAULT_KEY_BYTES = 64
const DEFAULT_SEPARATOR = ':'
const DEFAULT_ENCODING = 'hex'

/**
 * Factory for creating hashed passwords from plaintext passwords
 * and verifying the equivalence of a hashed password and its plaintext form.
 */
export class PasswordService {
  /**
   * Creates a hashed password from a plaintext password.
   *
   * @param password the plaintext password
   *
   * @returns a hashed password in the format "${salt}:${passwordHash}"
   */
  static async hash(password: string): Promise<string> {
    const salt = randomBytes(DEFAULT_SALT_BYTES).toString(DEFAULT_ENCODING)
    const derivedKey = await scryptPromise(password, salt, DEFAULT_KEY_BYTES)

    return salt + DEFAULT_SEPARATOR + (derivedKey as Buffer).toString(DEFAULT_ENCODING)
  }

  /**
   * Verifies that if the provided password is equivalent to the hashed password.
   *
   * @param password the plaintext password
   * @param hashedPassword the hashed password in the format "${salt}:${passwordHash}"
   *
   * @returns true when the passwords are equivalent, otherwise returns false
   */
  static async verify(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, key] = hashedPassword.split(DEFAULT_SEPARATOR)
    const keyBuffer = Buffer.from(key, DEFAULT_ENCODING)
    const derivedKey = await scryptPromise(password, salt, DEFAULT_KEY_BYTES)

    return timingSafeEqual(keyBuffer, derivedKey as Buffer)
  }
}
