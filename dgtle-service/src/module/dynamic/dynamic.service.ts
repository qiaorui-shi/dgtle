import { Injectable } from '@nestjs/common';
import { CreateDynamicDto } from './dto/create-dynamic.dto';
import { UpdateDynamicDto } from './dto/update-dynamic.dto';

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

  update(id: number, updateDynamicDto: UpdateDynamicDto) {
    return `This action updates a #${id} dynamic`;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamic`;
  }
}
