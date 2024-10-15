import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

import { Action } from '@common/auth'
import { BaseEntity } from '@common/database'

export const PERMISSIONS_ENTITY_NAME = 'permissions'

@Unique(['entity', 'action'])
@Entity(PERMISSIONS_ENTITY_NAME)
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'text' })
  entity: string

  @Column({ type: 'enum', enum: Action })
  action: Action
}
