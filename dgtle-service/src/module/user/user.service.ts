import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from 'src/common/utils/result';
// 引入实体
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, CreateGithubUserDto, UpdateUserDto } from './dto/index.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  /**
   * @description: 根据账号密码创建用户
   * @param createUserDto
   * */
  async createUser(createUserDto: CreateUserDto) {
    // 检查当前账号是否已经存在
    const user = await this.userRepo.findOne({ where: { phone: createUserDto.phone } });
    if (user) {
      return ResultData.fail(500, '该账号已创建');
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
      return ResultData.success(200, '创建成功');
    } else {
      return ResultData.fail(500, '创建失败');
    }
  }

  /**
   * @description: 根据github创建用户
   * */
  async createUserByGithub(createGithubUserDto: CreateGithubUserDto) {
    // 检查当前账号是否已经存在
    const user = await this.userRepo.findOne({ where: { githubId: createGithubUserDto.githubId } });
    if (user) {
      return ResultData.success(200, '登录成功', { ...user });
    } else {
      const res = await this.userRepo.save({ ...createGithubUserDto, level: 1, level_exp: 0 });
      if (res) {
        return ResultData.success(200, '登录成功', { ...res });
      } else {
        return ResultData.fail(500, '登录失败');
      }
    }
  }

  /**
   * @description: 根据账号查询用户信息
   * */
  async findUserByPhone(phone: string) {
    const user = await this.userRepo.findOne({ where: { phone } });
    return user || null;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
