import { Injectable } from '@nestjs/common';
import { CreateDynamicDto } from './dto';

@Injectable()
export class DynamicService {
  create(createDynamicDto: CreateDynamicDto) {
    return 'This action adds a new dynamic';
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
