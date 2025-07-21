import { IsNotEmpty, Length } from 'class-validator';
// 注册用户
export class RegistryUserDto {
  githubId?: string;
  email?: string;
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  @IsNotEmpty({ message: '账号不能为空' })
  phone: string;
  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  @IsNotEmpty({ message: '验证码不能为空' })
  code: string;
  uuid: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: '账号不能为空' })
  phone: string;
  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
