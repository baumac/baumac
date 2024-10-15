import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from '@common/database'
import {
  MAX_EMAIL_LENGTH,
  MAX_FIRST_NAME_LENGTH,
  MAX_LAST_NAME_LENGTH,
  MAX_PASSWORD_HASH_LENGTH,
  MAX_USERNAME_LENGTH,
  Role,
} from '@core/users/lib/v1/users.constants'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'varchar', length: MAX_USERNAME_LENGTH })
  @Index('idx_user_name', { unique: true })
  username: string

  @Column({ type: 'varchar', length: MAX_PASSWORD_HASH_LENGTH })
  password_hash: string

  @Column({ type: 'varchar', length: MAX_EMAIL_LENGTH })
  @Index('idx_email_name', { unique: true })
  email: string

  @Column({ type: 'varchar', length: MAX_FIRST_NAME_LENGTH, nullable: true })
  first_name: string | null

  @Column({ type: 'varchar', length: MAX_LAST_NAME_LENGTH, nullable: true })
  last_name: string | null

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role
}
