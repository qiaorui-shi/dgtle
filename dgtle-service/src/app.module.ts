import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbconfig from './config/index';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbconfig],
      cache: true,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
