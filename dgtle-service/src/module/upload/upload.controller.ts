import { Controller, Get } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * @description: 获取STS token临时凭证
   * @return {*}
   * */
  @Get('/ossSign')
  async getOssSign() {
    await this.uploadService.getOssSign();
  }
}
