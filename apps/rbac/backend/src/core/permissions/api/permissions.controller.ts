import {
  PaginationRequestProperties,
  PaginationRequestQueryParameter,
  PaginationResponseMetadata,
} from '@common/pagination'
import { PaginationParams } from '@common/pagination/pagination.decorator'
import {
  ListPermissionResponseDto,
  PermissionCreateDto,
  PermissionPatchDto,
  PermissionResponseDto,
  PermissionsService,
} from '@core/permissions/lib/common'

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  LoggerService,
  Optional,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

@Controller('v1/permissions')
export class PermissionsController {
  constructor(
    private permissionService: PermissionsService,
    @Optional()
    private readonly logger: LoggerService = new Logger(PermissionsController.name)
  ) {}

  @Get()
  async list(
    @PaginationParams() page: PaginationRequestProperties
  ): Promise<ListPermissionResponseDto> {
    this.logger.debug(`Listing permissions with page parameters: ${JSON.stringify(page)}`)

    const [entities, total] = await this.permissionService.list(page.size, page.number)

    return ListPermissionResponseDto.fromEntities(
      entities,
      PaginationResponseMetadata.from(page.number, page.size, total)
    )
  }

  @Post()
  async create(@Body() dto: PermissionCreateDto): Promise<PermissionResponseDto> {
    this.logger.log(`Creating permission from dto: ${dto}`)

    const entity = await this.permissionService.create(dto)

    return PermissionResponseDto.fromEntity(entity)
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<PermissionResponseDto> {
    this.logger.debug(`Getting permission with id ${id}`)
    const entity = await this.permissionService.getByIdOrFail(id)

    return PermissionResponseDto.fromEntity(entity)
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: PermissionPatchDto
  ): Promise<PermissionResponseDto> {
    this.logger.log(`Patching permission with id ${id}`)

    const updatedEntity = await this.permissionService.patch(id, dto)

    return PermissionResponseDto.fromEntity(updatedEntity)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting permission with id ${id}`)

    return this.permissionService.delete(id)
  }
}
