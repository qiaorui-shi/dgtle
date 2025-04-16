import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  registry(createUserDto: CreateUserDto) {
    // 生成随机字符串，默认长度为10
    const salt = bcrypt.genSaltSync(10);
    // 对用户密码进行加密
    if (createUserDto.password) {
      const pwdEncryStr = bcrypt.hashSync(createUserDto.password, salt);
      createUserDto.password = pwdEncryStr;
    }
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
