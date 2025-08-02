import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from '@common/database'
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from '@core/users/lib/common/users.constants'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'varchar', length: MAX_EMAIL_LENGTH })
  @Index('idx_email_name', { unique: true })
  email: string

  @Column({ type: 'text', length: MAX_PASSWORD_LENGTH })
  password: string
}
