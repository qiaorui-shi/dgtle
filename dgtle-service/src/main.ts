import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from './common/pipes/validate.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';
// import { AuthAuthGuard } from './common/guards/jwt.guard.ts';

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
  // 设置守卫 自己手动new注册，不是由nest管理，如果Guard中依赖其它服务就会出问题，因为nest不知道怎么给它注入依赖
  // 适用于简单守卫
  // app.useGlobalGuards(new AuthAuthGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
