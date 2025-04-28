import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/db/redis/redis.service';
import { UserService } from 'src/module/user/user.service';
import { RegistryUserDto, LoginUserDto } from './dto/index';

import { generateUUID } from 'src/common/utils';
import { createMath, createText } from 'src/common/utils/captcha';
import { CacheEnum } from 'src/common/enums/cacheEnum'; //
import { ResultData } from 'src/common/utils/result';

@Injectable()
export class MainService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {}

  /**
   * @description: 获取验证码
   * */
  async getCaptchaImage() {
    const captcha = createMath();
    const uuid = generateUUID();
    this.redisService.set(`${CacheEnum.CAPTCHA_CODE_KEY}${uuid}`, captcha.text, 60);
    return ResultData.success(200, '成功', {
      img: captcha.data,
      uuid,
    });
  }

  /**
   * @description: 注册用户
   * @param RegistryUserDto { CreateUserDto } 注册用户
   * */
  async registry(createUserDto: RegistryUserDto) {
    this.userService.registry(createUserDto);
  }

  /**
   * @description: 登录用户
   * @param loginUserDto { LoginUserDto } 登录用户
   * */
  async login(loginUserDto: LoginUserDto) {
    this.userService.login(loginUserDto);
  }
}
