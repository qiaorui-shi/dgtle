import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
