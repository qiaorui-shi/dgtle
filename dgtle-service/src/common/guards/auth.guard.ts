import {
  ExecutionContext,
  Injectable,
  Inject,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { pathToRegexp } from 'path-to-regexp';

import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../module/auth/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private whiteList: Array<{ path: string; method: string }> = [];
  constructor(
    private readonly config: ConfigService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    super();
    this.whiteList = this.config.get('perm.router.whiteList') || [];
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // 查看接口是否在白名单中
    if (this.checkWhiteList(ctx)) return true;
    const request = ctx.switchToHttp().getRequest();
    // 检查请求头是否有token
    const token = request.headers.authorization;
    if (!token) throw new ForbiddenException('请重新登录');
    // 解析token
    const res = await this.authService.parseToken(token);
    if (!res) throw new UnauthorizedException('当前登录已过期, 请重新登录');
    return await this.activate(ctx);
  }

  // 调用父类的acnActivate方法，执行相关策略
  async activate(ctx: ExecutionContext): Promise<boolean> {
    return super.canActivate(ctx) as Promise<boolean>;
  }
  
  /**
   * @description: 检查接口是否在白名单中
   * @param ctx ExecutionContext
   * @return boolean
   */
  checkWhiteList(ctx): boolean {
    const request = ctx.switchToHttp().getRequest();
    const i = this.whiteList.findIndex((route) => {
      // 如果请求的方法和路径都匹配，就返回true
      if (route.method && route.method.toUpperCase() === request.method.toUpperCase()) {
        return !!pathToRegexp(route.path).regexp.exec(request.url);
      }
      // 反之false
      return false;
    });
    return i > -1;
  }
}
