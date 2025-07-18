// src/auth/guards/auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GithubAuthGuard } from './github-auth.guard';

@Injectable()
export class AuthGuard {
  constructor(
    private jwtGuard: JwtAuthGuard,
    private githubGuard: GithubAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.url.includes('/github/login')) {
      // 如果是github登录路由
      return this.githubGuard.canActivate(context);
    } else {
      return this.jwtGuard.canActivate(context);
    }
  }

  // 调用父类的acnActivate方法，执行相关策略
  async activate(ctx: ExecutionContext): Promise<boolean> {
    return super.canActivate(ctx) as Promise<boolean>;
  }
}
