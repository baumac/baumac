import { Repository } from 'typeorm'

import { PasswordService } from '@common/security'
import { Role } from '@core/auth/lib/common'
import { UserCreateDto } from '@core/users/lib/common/users.dto'
import { User } from '@core/users/lib/common/users.entity'

import { Injectable, Logger, LoggerService, Optional } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @Optional()
    private readonly logger: LoggerService = new Logger(UsersService.name)
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    this.logger.log(`Finding user with username: ${username}`)
    return this.repo.findOne({ where: { username } })
  }

  async create(dto: UserCreateDto): Promise<User> {
    this.logger.log(`Creating user with username: ${dto.username}`)
    const user = this.repo.create({
      username: dto.username,
      password_hash: await PasswordService.hash(dto.password),
      email: dto.email,
      first_name: dto.first_name,
      last_name: dto.last_name,
      role: Role.USER,
    })

    await this.repo.insert(user)

    return user
  }

  // getById - note: maybe not needed if we have findOne and/or findOneOrfail
  // patch
  // delete
  // login
}
