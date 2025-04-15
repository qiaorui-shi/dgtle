import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`], // 匹配任意层级下的所有实体文件 **/*.entity{.ts,.js} 表示匹配所有以 .ts 或 .js 结尾的文件。
          autoLoadEntities: true, // 自动加载实体文件，无需手动导入实体类。
          timezone: '+08:00', // 设置为中国标准时间
          ...config.get('db.mysql'), // 从配置文件中获取数据库连接信息
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
