import { DatabaseConfig, InjectDatabaseConfig } from '@common/config'

import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(
    @InjectDatabaseConfig()
    private dbConfig: DatabaseConfig
  ) {}

  getHello(): string {
    return `Hello World! ${this.dbConfig}`
  }
}
