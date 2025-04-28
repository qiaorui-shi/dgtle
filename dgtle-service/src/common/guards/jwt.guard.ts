import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { pathToRegexp } from 'path-to-regexp';

import { ConfigService } from '@nestjs/config';
import { UserService } from '../../module/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private whiteList: Array<{ path: string; method: string }> = [];
  constructor(
    private readonly config: ConfigService,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super();
    this.whiteList = this.config.get('perm.router.whiteList') || [];
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // 查看接口是否在白名单中
    if (this.checkWhiteList(context)) return true;
    const request = context.switchToHttp().getRequest();
    // 检查token是否存在
    const token = request.headers.authorization;
    if (!token) return false; // 不存在，返回false，不通过
    // 检查token是否过期
    return false;
  }

  /**
   * @description: 检查接口是否在白名单中
   * @param context ExecutionContext
   * @return boolean
   */
  checkWhiteList(context): boolean {
    const request = context.switchToHttp().getRequest();
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
