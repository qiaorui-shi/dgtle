import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // ArgumentsHost 是一个功能强大的使用程序对象 在这里用来获取request和response对象
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const status = exception.getStatus();
    const validatorMessage = exception.message;

    response.status(status).json({
      statusCode: status,
      message: validatorMessage,
    });
  }
}
