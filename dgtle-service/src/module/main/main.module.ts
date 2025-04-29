import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'), // 密钥
        signOptions: { expiresIn: config.get('jwt.expiresin') }, // token过期时间
      }),
    }),
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
