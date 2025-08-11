import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '@/config/index';
import { DatabaseModule } from '@/db/mysql/db.module';
import { RedisModule } from '@/db/redis/redis.module';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { AuthModule } from '@/module/auth/auth.module';
import { UploadModule } from '@/module/upload/upload.module';
import { UserModule } from '@/module/user/user.module';
import { DynamicModule } from '@/module/dynamic/dynamic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      cache: true,
    }),
    DatabaseModule,
    RedisModule,

    // system
    AuthModule,
    UploadModule,
    UserModule,
    DynamicModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
