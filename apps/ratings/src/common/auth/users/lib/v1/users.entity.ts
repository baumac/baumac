import {
  Check,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

import { Role } from '@common/auth/roles/lib/v1'
import {
  MAX_EMAIL_LENGTH,
  MAX_FIRST_NAME_LENGTH,
  MAX_LAST_NAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_FIRST_NAME_LENGTH,
  MIN_LAST_NAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@common/auth/users/lib/v1/users.constants'
import { BaseEntity } from '@common/database'

export const USERS_ENTITY_NAME = 'users'
export const USERS_ROLES_JOIN_TABLE_NAME = 'users_roles'

export const USER_EMAIL_INDEX = 'index_user_email'
export const USER_USERNAME_INDEX = 'index_user_username'

export const USER_USERNAME_LENGTH_CHECK = 'check_user_username_length'
export const USER_EMAIL_LENGTH_CHECK = 'check_user_email_length'
export const USER_FIRST_NAME_LENGTH_CHECK = 'check_user_first_name_length'
export const USER_LAST_NAME_LENGTH_CHECK = 'check_user_last_name_length'

@Index(USER_EMAIL_INDEX, { synchronize: false })
@Index(USER_USERNAME_INDEX, { synchronize: false })
@Check(
  USER_USERNAME_LENGTH_CHECK,
  `char_length(name) BETWEEN ${MIN_USERNAME_LENGTH} AND ${MAX_USERNAME_LENGTH}`
)
@Check(
  USER_EMAIL_LENGTH_CHECK,
  `char_length(name) BETWEEN ${MIN_EMAIL_LENGTH} AND ${MAX_EMAIL_LENGTH}`
)
@Check(
  USER_FIRST_NAME_LENGTH_CHECK,
  `char_length(name) BETWEEN ${MIN_FIRST_NAME_LENGTH} AND ${MAX_FIRST_NAME_LENGTH}`
)
@Check(
  USER_LAST_NAME_LENGTH_CHECK,
  `char_length(name) BETWEEN ${MIN_LAST_NAME_LENGTH} AND ${MAX_LAST_NAME_LENGTH}`
)
@Unique(['username'])
@Unique(['email'])
@Entity(USERS_ENTITY_NAME)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'citext' })
  username: string

  @Column({ type: 'text' })
  password_hash: string

  @Column({ type: 'citext' })
  email: string

  @Column({ type: 'text' })
  first_name: string

  @Column({ type: 'text' })
  last_name: string

  @ManyToMany(() => Role)
  @JoinTable({ name: USERS_ROLES_JOIN_TABLE_NAME })
  roles: Role[]
}
