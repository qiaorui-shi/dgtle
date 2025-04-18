import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  ResetPwdDto,
  UpdatePwdDto,
} from './dto/index.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @param {CreateUserDto} createUserDto 注册用户
   * @returns {Promise<ResultData>} 注册结果
   * */
  @Post('')
  registry(@Body() createUserDto: CreateUserDto) {
    return this.userService.registry(createUserDto);
  }

  /**
   * @param {LoginUserDto} loginUserDto 登录用户
   * @returns {Promise<ResultData>} 登录结果
   * */
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('/list')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
