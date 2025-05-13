import { IsOptional, IsString, IsArray, Length } from 'class-validator';
export class CreateDynamicDto {
  @IsOptional()
  @IsString()
  @Length(0, 200, { message: '最多200个字' })
  dynamic_text?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) //验证数组中每个元素都是字符串
  dynamic_images?: string[];
}
