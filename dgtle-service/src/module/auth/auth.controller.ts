import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post } from '@nestjs/common';
import { RegistryUserDto, LoginUserDto } from './dto/index';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
   * github
   * */
  @Get('/github/login')
  githubLogin() {
    return ''
  }
}
