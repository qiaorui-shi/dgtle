import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async get(key: string) {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string, time: number) {
    // 'EX'： 为键设置秒级过期时间;
    // 'PX' 为键设置毫秒级过期时间;
    // 'nx'：只有在 key 不存在时 才设置（常用于实现分布式锁）
    // 'xx':与nx相反，只有在 key 已存在时 才设置。用于更新。可单独用setxx命令替代
    return this.redisClient.set(key, value, 'EX', time);
  }

  async del(key: string) {
    return this.redisClient.del(key);
  }

  async hget(key: string, field: string) {
    return this.redisClient.hget(key, field);
  }
}
