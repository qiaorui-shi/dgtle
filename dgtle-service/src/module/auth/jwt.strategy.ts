import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/db/redis/redis.service';
import { CacheEnum } from 'src/common/enums/cacheEnum'; //

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中获取token
      ignoreExpiration: false, // 忽略过期时间
      secretOrKey: config.get('jwt.secretkey'), // 密钥
    });
  }

  // 实现PassportStrategy中的validate方法，用于验证token是否有效
  async validate(payload: any) {
    const { uuid, userId } = payload;
    const user = await this.redisService.get(`${CacheEnum.LOGIN_TOKEN_KEY}${uuid}`); // 从redis中获取用户信息
    if (!user) throw new UnauthorizedException('当前登录已过期, 请重新登录');
    // 这里renturn后默认会将payload赋值给req.user 属于passport的默认标准行为
    return payload
  }
}
