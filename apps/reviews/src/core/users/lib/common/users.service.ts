import { Repository } from 'typeorm'

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
  ) {
    // getById
    // list
    // create
    // patch
    // delete
  }
}
