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
import { MainService } from '../../module/main/main.service';
import { ResultData } from '../utils/result';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private whiteList: Array<{ path: string; method: string }> = [];
  constructor(
    private readonly config: ConfigService,
    @Inject(MainService) private readonly mainService: MainService,
  ) {
    super();
    this.whiteList = this.config.get('perm.router.whiteList') || [];
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // 查看接口是否在白名单中
    if (this.checkWhiteList(ctx)) return true;
    const request = ctx.switchToHttp().getRequest();
    // 检查token是否存在
    const token = request.headers.authorization;
    if (!token) throw new ForbiddenException('请重新登录');
    // 检查token是否过期
    const res = await this.mainService.verifyToken(token);
    if (!res) throw new UnauthorizedException('当前登录已过期, 请重新登录');
    return true;
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
