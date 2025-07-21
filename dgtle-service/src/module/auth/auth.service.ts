import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/db/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/module/user/user.service';

import { CacheEnum } from 'src/common/enums/cacheEnum';
import { ResultData } from 'src/common/utils/result';
import { createText } from 'src/common/utils/captcha';
import { generateUUID } from 'src/common/utils';
import { RegistryUserDto, LoginUserDto } from './dto/index';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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
    const { username, password, phone, code, uuid } = registryUserDto;
    const captchaCode = await this.redisService.get(`${CacheEnum.CAPTCHA_CODE_KEY}${uuid}`);
    if (!captchaCode) return ResultData.fail(500, '验证码已过期');
    if (captchaCode === code) return ResultData.fail(500, '验证码错误');
    // 验证码正确,删除验证码
    this.redisService.del(`${CacheEnum.CAPTCHA_CODE_KEY}${uuid}`);
    // 注册用户
    const res = await this.userService.createUser({ username, password, phone });
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

  /**
   * @description github登录
   *
   * */
  async githubLogin(user: any) {
    const userInfo = this.userService.findUserByGithubId(user.githubId);
    if (userInfo) {
      // 存在用户直接返回
      return ResultData.success(200, '登录成功', { ...userInfo });
    } else {
      // 自动注册后返回用户信息
      const res = await this.userService.createUser({
        githubId: user.githubId,
        username: user.username,
        email: user.email,
      });
      if (res.code === 200) {
        return ResultData.success(200, '登录成功', { ...res });
      } else {
        return ResultData.fail(500, res.message);
      }
    }
  }

  /**
   * @description: 生成token
   * @param payload { uuid: string; userId: string }
   * */
  createToken(payload: { uuid: string; userId: string }) {
    return this.jwtService.sign(payload);
  }

  /**
   * @description: 解析token
   * @param token string
   * */
  parseToken(token: string) {
    if (!token) return null;
    try {
      const payload = this.jwtService.verify(token.replace('Bearer ', ''));
      return payload;
    } catch (error) {
      return null;
    }
  }
}
