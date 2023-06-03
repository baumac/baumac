import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DEFAULT_CONNECTION_TIMEOUT, DEFAULT_QUERY_TIMEOUT, DEFAULT_STATEMENT_TIMEOUT } from "./database.constants";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [],
        synchronize: true,
        extra: {
          connectionTimeoutMillis: DEFAULT_CONNECTION_TIMEOUT,
          statement_timeout: DEFAULT_STATEMENT_TIMEOUT,
          query_timeout: DEFAULT_QUERY_TIMEOUT
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers:[ TypeOrmModule ],
  exports:[ TypeOrmModule ],
})
export class DatabaseModule {}
