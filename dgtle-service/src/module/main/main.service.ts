import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/db/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
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
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * @description: 生成token
   * @param payload { uuid: string; userId: string }
   * */
  createToken(payload: { uuid: string; userId: string }) {
    return this.jwtService.sign(payload);
  }

  /**
   * @description: 验证token
   * @param token string
   * */
  verifyToken(token: string) {
    if (!token) return null;
    return this.jwtService.verify(token.replace('Bearer ', ''));
  }

  /**
   * @description: 获取验证码
   * */
  async getCaptchaImage() {
    const captcha = createText();
    const uuid = generateUUID();
    this.redisService.set(`${CacheEnum.CAPTCHA_CODE_KEY}${uuid}`, captcha.text, 60);
    return ResultData.success(200, '成功', {
      img: captcha.data,
      uuid,
    });
  }

  /**
   * @description: 注册用户
   * */
  async registry(registryUserDto: RegistryUserDto) {
    // 这里只处理验证码逻辑,创建用户逻辑丢给userService处理
    const { code, uuid } = registryUserDto;
    const captchaCode = await this.redisService.get(`${CacheEnum.CAPTCHA_CODE_KEY}${uuid}`);
    if (!captchaCode) return ResultData.fail(500, '验证码已过期');
    if (captchaCode === code) return ResultData.fail(500, '验证码错误');
    // 验证码正确,删除验证码
    this.redisService.del(`${CacheEnum.CAPTCHA_CODE_KEY}${uuid}`);
    // 注册用户
    const res = await this.userService.createUser(registryUserDto);
    if (res.code === 200) {
      return ResultData.success(200, '注册成功');
    } else {
      return ResultData.fail(500, res.message);
    }
  }

  /**
   * @description: 登录
   * */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByPhone(loginUserDto.phone);
    if (user) {
      if (!bcrypt.compareSync(loginUserDto.password, user.password))
        return ResultData.fail(500, '密码错误');

      // 生成uuid
      const uuid = generateUUID();
      // 根据uuid和用户id生成token
      const token = this.createToken({ uuid, userId: user.id });
      this.redisService.set(
        `${CacheEnum.LOGIN_TOKEN_KEY}${uuid}`,
        JSON.stringify(user),
        60 * 60 * 3,
      );
      const userInfo = {
        id: user.id,
        phone: user.phone,
        username: user.username,
        level: user.level,
        level_exp: user.level_exp,
      };
      return ResultData.success(200, '登录成功', { userInfo, token });
    } else {
      return ResultData.fail(500, '账号不存在');
    }
  }
}
