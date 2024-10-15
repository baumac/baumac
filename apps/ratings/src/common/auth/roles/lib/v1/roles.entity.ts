import { Check, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Permission } from '@common/auth/permissions/lib/v1'
import { MAX_DESCRIPTION_LENGTH, RoleName } from '@common/auth/roles/lib/v1/roles.constants'
import { BaseEntity } from '@common/database'

export const ROLES_ENTITY_NAME = 'roles'
export const ROLES_PERMISSIONS_JOIN_TABLE_NAME = 'permissions_roles'

export const ROLE_DESCRIPTION_LENGTH_CHECK = 'check_role_description_length'

@Check(ROLE_DESCRIPTION_LENGTH_CHECK, `char_length(description) <= ${MAX_DESCRIPTION_LENGTH}`)
@Entity(ROLES_ENTITY_NAME)
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'enum', enum: RoleName, default: RoleName.USER })
  readonly name: RoleName

  @Column({ type: 'text' })
  description: string

  @ManyToMany(() => Permission)
  @JoinTable({ name: ROLES_PERMISSIONS_JOIN_TABLE_NAME })
  permissions: Permission[]
}
