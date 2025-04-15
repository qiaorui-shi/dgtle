import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  RedisModule as redis,
  RedisModuleOptions,
} from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    redis.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'single', // 'single' | 'cluster' 有单例模式和集群模式
          url: config.get('redis.url') || undefined,
          options: config.get('redis.options') || {},
        } as RedisModuleOptions;
      },
    }),
  ],
  providers: [RedisService],
})
export class RedisModule {}
