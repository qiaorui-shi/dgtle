import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbconfig from './config/index';
import { DatabaseModule } from './db/mysql/db.module';
import { RedisModule } from './db/redis/redis.module';
import { UserModule } from './module/user/user.module';
import { DynamicModule } from './module/dynamic/dynamic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbconfig],
      cache: true,
    }),
    DatabaseModule,
    RedisModule,
    UserModule,
    DynamicModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
