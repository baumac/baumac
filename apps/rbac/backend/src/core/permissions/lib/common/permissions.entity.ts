import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from '@common/database'
import {
  MAX_PERMISSION_DESCRIPTION_LENGTH,
  MAX_PERMISSION_NAME_LENGTH,
} from '@core/permissions/lib/common/permissions.constants'

export const PERMISSION_ENTITY_TABLE_NAME = 'permissions'

@Entity(PERMISSION_ENTITY_TABLE_NAME)
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Index('idx_permission_name', { unique: true })
  @Column({ type: 'varchar', length: MAX_PERMISSION_NAME_LENGTH })
  name: string

  @Column({ type: 'varchar', nullable: true, length: MAX_PERMISSION_DESCRIPTION_LENGTH })
  description: string | null
}
