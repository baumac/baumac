import { DataSource } from 'typeorm'

import {
  PermissionCreateDto,
  PermissionPatchDto,
} from '@core/permissions/lib/common/permissions.dto'
import {
  Permission,
  PERMISSION_ENTITY_TABLE_NAME,
} from '@core/permissions/lib/common/permissions.entity'

import { Injectable, Logger, LoggerService, Optional } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'

@Injectable()
export class PermissionsService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @Optional()
    private readonly logger: LoggerService = new Logger(PermissionsService.name)
  ) {}

  async getByIdOrFail(id: string): Promise<Permission> {
    this.logger.debug(`Getting permission by id: ${id}`)

    return this.dataSource.manager.findOneOrFail(Permission, { where: { id } })
  }

  async list(pageSize, pageNumber): Promise<[Permission[], number]> {
    const limit = pageSize
    const offset = (pageNumber - 1) * limit

    return this.dataSource.manager.findAndCount(Permission, { skip: offset, take: limit })
  }

  async create(dto: PermissionCreateDto): Promise<Permission> {
    this.logger.debug(`Creating permission: ${JSON.stringify(dto)}`)

    return await this.dataSource.transaction(async (manager) => {
      const entity = manager.create(Permission, {
        name: dto.name,
        description: dto.description ?? null,
      })

      return await manager.save(entity)
    })
  }

  async patch(permissionId: string, dto: PermissionPatchDto): Promise<Permission> {
    this.logger.debug(`Patching permission with id: ${permissionId}`)

    return await this.dataSource.transaction(async (manager) => {
      const entity = await manager.findOneOrFail(Permission, {
        where: { id: permissionId },
        lock: { mode: 'pessimistic_write', tables: [PERMISSION_ENTITY_TABLE_NAME] },
      })

      const updatedEntity = manager.create(Permission, {
        ...entity,
        description: dto.description ?? null,
      })

      return manager.save(updatedEntity)
    })
  }

  async delete(permissionId: string): Promise<void> {
    this.logger.debug(`Deleting permission with id: ${permissionId}`)

    await this.dataSource.transaction(async (manager) => {
      const entity = await manager.findOneOrFail(Permission, {
        where: { id: permissionId },
        lock: { mode: 'pessimistic_write', tables: [PERMISSION_ENTITY_TABLE_NAME] },
      })

      await manager.remove(entity)
    })
  }
}
