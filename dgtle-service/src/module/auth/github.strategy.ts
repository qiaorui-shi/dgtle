import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get('github.clientId') as string,
      clientSecret: config.get('github.clientSecret') as string,
      callbackURL: config.get('github.callbackURL') as string,
    });
  }

  // 实现父类抽象方法validate
  // accessToken 访问令牌，用于访问用户资源
  // refreshToken 刷新令牌，用于刷新访问令牌
  // profile 用户信息
  async validate(accessToken: string, refreshToken: string, profile: any): Promise<unknown> {
    return {
      githubId: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value,
      accessToken,
    };
  }
}
