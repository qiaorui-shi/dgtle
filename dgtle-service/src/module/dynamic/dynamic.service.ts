import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// 引入实体
import { DynamicEntity } from './entities/dynamic.entity';
import { CreateDynamicDto } from './dto/index.dto';
import { ResultData } from 'src/common/utils/result';

@Injectable()
export class DynamicService {
  constructor(
    @InjectRepository(DynamicEntity)
    private readonly dynamicRepo: Repository<DynamicEntity>,
  ) {}

  create(createDynamicDto: CreateDynamicDto, req) {
    const { dynamic_text, dynamic_images } = createDynamicDto;
    if (!dynamic_text && dynamic_images?.length === 0) {
      return ResultData.fail(500, '发布内容不能为空');
    }
    console.log("🚀 ~ DynamicService ~ create ~ req:", req)
    // createDynamicDto.dynamicPublishTime = new Date();
    // this.dynamicRepo.save(createDynamicDto);
  }

  findAll() {
    return `This action returns all dynamic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dynamic`;
  }

  update(id: number) {}

  remove(id: number) {
    return `This action removes a #${id} dynamic`;
  }
}
