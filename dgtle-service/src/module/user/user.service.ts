import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { ResultData } from 'src/common/utils/result.utils'
// 引入实体
import { UserEntity } from './entities/user.entity'
import { CreateUserDto, UpdateUserDto } from './dto/index.dto'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async registry (createUserDto: CreateUserDto) {
    // 检查当前账号是否已经存在
    const user = await this.userRepo.findOne({ where: { account: createUserDto.account } })
    if (user) {
      return ResultData.fail(500, '该账号已注册')
    }

    // 生成随机字符串，默认长度为10
    const salt = bcrypt.genSaltSync(10)
    // 对用户密码进行加密
    if (createUserDto.password) {
      const pwdEncryptedStr = bcrypt.hashSync(createUserDto.password, salt)
      createUserDto.password = pwdEncryptedStr
    }

    // 保存用户信息到数据库
    const res = await this.userRepo.save({ ...createUserDto, level: 1 })
    if (res) {
      return ResultData.success(200, '注册成功')
    }
  }

  findAll () {
    return `This action returns all user`
  }

  findOne (id: number) {
    return `This action returns a #${id} user`
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove (id: number) {
    return `This action removes a #${id} user`
  }
}
