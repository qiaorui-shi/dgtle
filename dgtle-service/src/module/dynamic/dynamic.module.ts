import { Module } from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { DynamicController } from './dynamic.controller';

import { TypeOrmModule } from '@nestjs/typeorm'; // 引入 TypeOrmModule
import { DynamicEntity } from './entities/dynamic.entity'; // 引入 DynamicEntity 实体
@Module({
  imports: [TypeOrmModule.forFeature([DynamicEntity])], // 注册 DynamicEntity 实体
  controllers: [DynamicController],
  providers: [DynamicService],
})
export class DynamicModule {}
