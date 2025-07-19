import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator'

import { Role } from '@core/auth/lib/common'
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LOWERCASE,
  MIN_PASSWORD_NUMBERS,
  MIN_PASSWORD_SYMBOLS,
  MIN_PASSWORD_UPPERCASE,
  MIN_USERNAME_LENGTH,
} from '@core/users/lib/common/users.constants'
import { User } from '@core/users/lib/common/users.entity'

export class UserCreateDto {
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  @IsString()
  username: string

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

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  first_name?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  last_name?: string
}

export class UserPatchDto {
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  @IsString()
  @IsOptional()
  username?: string

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

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  first_name?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  last_name?: string
}

export class UserResponseDto {
  id: string
  username: string
  email: string
  first_name: string | null
  last_name: string | null
  role: Role

  static fromEntity(entity: User): UserResponseDto {
    return {
      id: entity.id,
      username: entity.username,
      email: entity.email,
      first_name: entity.first_name,
      last_name: entity.last_name,
      role: entity.role,
    }
  }
}
