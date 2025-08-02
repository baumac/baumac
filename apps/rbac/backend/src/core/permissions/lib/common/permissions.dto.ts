import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

import { PaginationResponseMetadata } from '@common/pagination'
import {
  MAX_PERMISSION_DESCRIPTION_LENGTH,
  MAX_PERMISSION_NAME_LENGTH,
  MIN_PERMISSION_DESCRIPTION_LENGTH,
  MIN_PERMISSION_NAME_LENGTH,
} from '@core/permissions/lib/common/permissions.constants'
import { Permission } from '@core/permissions/lib/common/permissions.entity'

export class PermissionCreateDto {
  @MaxLength(MAX_PERMISSION_NAME_LENGTH)
  @MinLength(MIN_PERMISSION_NAME_LENGTH)
  @IsString()
  name: string

  @MaxLength(MAX_PERMISSION_DESCRIPTION_LENGTH)
  @MinLength(MIN_PERMISSION_DESCRIPTION_LENGTH)
  @IsOptional()
  description?: string
}

export class PermissionPatchDto {
  @MaxLength(MAX_PERMISSION_DESCRIPTION_LENGTH)
  @MinLength(MIN_PERMISSION_DESCRIPTION_LENGTH)
  @IsOptional()
  description?: string
}

export class ListPermissionResponseDto {
  data: PermissionResponseDto[]
  meta: PaginationResponseMetadata

  static fromEntities(
    entities: Permission[],
    meta: PaginationResponseMetadata
  ): ListPermissionResponseDto {
    return {
      data: entities.map((entity) => PermissionResponseDto.fromEntity(entity)),
      meta,
    }
  }
}

export class PermissionResponseDto {
  id: string
  name: string
  description: string | null
  created_at: Date
  updated_at: Date

  static fromEntity(entity: Permission): PermissionResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    }
  }
}
