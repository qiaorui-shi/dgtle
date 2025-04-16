import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from './common/pipes/validate.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 静态文件目录 使用useStaticAssets方法必须在create时指定类型为NestExpressApplication
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '', // 访问路径前缀
  });
  // 全局验证
  app.useGlobalPipes(new ValidationPipe());
  // 全局异常过滤器，统一处理异常
  app.useGlobalFilters(new HttpExceptionFilter());
  // 设置接口前缀
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap(); 
