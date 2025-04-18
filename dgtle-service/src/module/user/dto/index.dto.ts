import { IsNotEmpty, Length } from 'class-validator';
// 注册用户
export class CreateUserDto {
  @IsNotEmpty({ message: '账号不能为空' })
  account: string;

  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  phone: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: '账号不能为空' })
  account: string;

  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

// 更新用户信息
export class UpdateUserDto {}

// 更新密码
export class UpdatePwdDto {}

// 重置密码
export class ResetPwdDto {}
