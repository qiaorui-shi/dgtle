import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { CreateDynamicDto } from './dto/index.dto';

@Controller('dynamic')
export class DynamicController {
  constructor(private readonly dynamicService: DynamicService) {}

  @Post('/publish')
  create(@Body() createDynamicDto: CreateDynamicDto, @Req() req) {
    return this.dynamicService.create(createDynamicDto, req);
  }

  @Get()
  findAll() {
    return this.dynamicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicService.remove(+id);
  }
}
