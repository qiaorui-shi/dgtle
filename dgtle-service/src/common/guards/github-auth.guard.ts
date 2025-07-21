import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 使用 passport-github2 策略
@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
  constructor() {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
