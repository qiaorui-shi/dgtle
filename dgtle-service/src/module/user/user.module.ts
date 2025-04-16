import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

// TypeOrmModule.forFeature 在该模块中注册数据库实体类 便于service中使用Repository来执行数据库操作
import { TypeOrmModule } from '@nestjs/typeorm';
// Enitity
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
