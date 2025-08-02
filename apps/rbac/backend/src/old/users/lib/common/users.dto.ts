import { IsEmail, IsOptional, IsStrongPassword, MaxLength } from 'class-validator'

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LOWERCASE,
  MIN_PASSWORD_NUMBERS,
  MIN_PASSWORD_SYMBOLS,
  MIN_PASSWORD_UPPERCASE,
} from '@core/users/lib/common/users.constants'
import { User } from '@core/users/lib/common/users.entity'

export class UserCreateDto {
  @IsEmail()
  email: string

  @IsStrongPassword({
    minLength: MIN_PASSWORD_LENGTH,
    minLowercase: MIN_PASSWORD_LOWERCASE,
    minUppercase: MIN_PASSWORD_UPPERCASE,
    minNumbers: MIN_PASSWORD_NUMBERS,
    minSymbols: MIN_PASSWORD_SYMBOLS,
  })
  @MaxLength(MAX_PASSWORD_LENGTH)
  password: string
}

export class UserPatchDto {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsStrongPassword({
    minLength: MIN_PASSWORD_LENGTH,
    minLowercase: MIN_PASSWORD_LOWERCASE,
    minUppercase: MIN_PASSWORD_UPPERCASE,
    minNumbers: MIN_PASSWORD_NUMBERS,
    minSymbols: MIN_PASSWORD_SYMBOLS,
  })
  @MaxLength(MAX_PASSWORD_LENGTH)
  @IsOptional()
  password?: string
}

export class UserResponseDto {
  id: string
  email: string
  created_at: Date
  updated_at: Date

  static fromEntity(entity: User): UserResponseDto {
    return {
      id: entity.id,
      email: entity.email,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    }
  }
}
