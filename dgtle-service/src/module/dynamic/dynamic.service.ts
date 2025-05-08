import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// 引入实体
import { DynamicEntity } from './entities/dynamic.entity';
import { CreateDynamicDto } from './dto/index';

@Injectable()
export class DynamicService {
  constructor(
    @InjectRepository(DynamicEntity)
    private readonly dynamicRepo: Repository<DynamicEntity>,
  ) {}

  create(createDynamicDto: CreateDynamicDto) {
    console.log("🚀 ~ DynamicService ~ create ~ createDynamicDto:", createDynamicDto)
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
