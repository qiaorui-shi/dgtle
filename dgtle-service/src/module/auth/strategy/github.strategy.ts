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
    // 1.判断是创建用户还是直接取对应用户

    // 2.创建/登录完成后，将用户信息返回给客户端以及token，还有redirectUrl
    return {
      githubId: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value,
      accessToken,
    };
  }
}
