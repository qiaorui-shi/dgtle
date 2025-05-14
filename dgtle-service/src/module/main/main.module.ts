import { Global, Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Global()
@Module({
  imports: [AuthModule, UserModule],
  controllers: [MainController],
  providers: [MainService],
  exports: [MainService],
})
export class MainModule {}
