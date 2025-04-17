import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async get(key: string) {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string, time: number) {
    return this.redisClient.set(key, value, 'EX', time);
  }

  async del(key: string) {
    return this.redisClient.del(key);
  }

  async hget(key: string, field: string) {
    return this.redisClient.hget(key, field);
  }
}
