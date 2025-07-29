import { Get, UseGuards, Request, Response, Inject } from '@nestjs/common';
import { GithubAuthGuard } from '@/common/guards/github-auth.guard';

import { ResultData } from 'src/common/utils/result';
import { ConfigService } from '@nestjs/config';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post } from '@nestjs/common';
import { RegistryUserDto, LoginUserDto } from './dto/index';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}
  /**
   * @description 获取验证码
   * @returns {Promise<ResultData>} 返回验证码图片
   * */
  @Get('/captcha')
  getCaptchaImage() {
    return this.authService.getCaptchaImage();
  }

  /**
   * @param {RegistryUserDto} 注册用户
   * @returns {Promise<ResultData>} 注册结果
   * */
  @Post('/registry')
  registry(@Body() registryUserDto: RegistryUserDto) {
    return this.authService.registry(registryUserDto);
  }

  /**
   * @param {LoginUserDto} loginUserDto 登录用户
   * @returns {Promise<ResultData>} 登录结果
   * */
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  /**
   * @description github登录 这个接口回被守卫拦截
   * */
  @UseGuards(GithubAuthGuard)
  @Get('/github')
  githubLogin() {}

  /**
   * @descrtion github授权后携带code参数重定向该接口
   * @params {}
   * */
  @UseGuards(GithubAuthGuard)
  @Get('/github/callback')
  async githubAuthCallback(@Request() req) {
    const user = req.user;
    return this.authService.githubLogin(user);
  }
}
