import { IsNotEmpty, Length, ValidateIf } from 'class-validator';

export class CreateUserDto {
  githubId?: string;

  email?: string;

  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ValidateIf((o) => !o.githubId)
  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password?: string;

  phone?: string;
}

// 更新用户信息
export class UpdateUserDto {}

// 更新密码
export class UpdatePwdDto {}

// 重置密码
export class ResetPwdDto {}
