import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { GenerateUUID } from 'src/common/utils/index';
import { ResultData } from 'src/common/utils/result';
import { RedisService } from 'src/db/redis/redis.service'; // 引入redis服务，用于存储token
// 引入实体
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/index.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
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

  async registry(createUserDto: CreateUserDto) {
    // 检查当前账号是否已经存在
    const user = await this.userRepo.findOne({ where: { account: createUserDto.account } });
    if (user) {
      return ResultData.fail(500, '该账号已注册');
    }

    // 生成随机字符串，默认长度为10
    const salt = bcrypt.genSaltSync(10);
    // 对用户密码进行加密
    if (createUserDto.password) {
      const pwdEncryptedStr = bcrypt.hashSync(createUserDto.password, salt);
      createUserDto.password = pwdEncryptedStr;
    }
    // 保存用户信息到数据库
    const res = await this.userRepo.save({ ...createUserDto, level: 1, level_exp: 0 });
    if (res) {
      return ResultData.success(200, '注册成功');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepo.findOne({ where: { account: loginUserDto.account } });
    if (!user) return ResultData.fail(500, '账号不存在');
    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      return ResultData.fail(500, '密码错误');

    // 生成uuid
    const uuid = GenerateUUID();
    // 根据uuid和用户id生成token
    const token = this.createToken({ uuid, userId: user.id });
    this.redisService.set(`${uuid}${user.id}`, JSON.stringify(user), 60 * 60 * 3);
    return ResultData.success(200, '登录成功', { token });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
