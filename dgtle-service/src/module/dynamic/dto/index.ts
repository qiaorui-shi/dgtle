import { IsOptional, IsString, IsArray, Length } from 'class-validator';
export class CreateDynamicDto {
  @IsOptional()
  @IsString()
  @Length(1, 200, { message: '最多200个字' })
  dynamic_text: string;

  @IsOptional()
  @IsArray()
  dynamic_images?: string[];
}
