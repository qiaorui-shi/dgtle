import { Controller, Body, Get, Post } from '@nestjs/common';
import { RegistryUserDto, LoginUserDto } from './dto/index';
import { MainService } from './main.service';
@Controller()
export class MainController {
  constructor(private mainService: MainService) {}

  /**
   * @description 获取验证码
   * @returns {Promise<ResultData>} 返回验证码图片
   * */
  @Get('/captcha')
  getCaptchaImage() {
    return this.mainService.getCaptchaImage();
  }
  
  /**
   * @param {RegistryUserDto} createUserDto 注册用户
   * @returns {Promise<ResultData>} 注册结果
   * */
  @Post('/registry')
  registry(@Body() createUserDto: RegistryUserDto) {
    return this.mainService.registry(createUserDto);
  }

  /**
   * @param {LoginUserDto} loginUserDto 登录用户
   * @returns {Promise<ResultData>} 登录结果
   * */
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.mainService.login(loginUserDto);
  }
}
