import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { GithubStrategy } from './github.strategy';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'), // 密钥
        signOptions: { expiresIn: config.get('jwt.expiresin') }, // token过期时间
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GithubStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
