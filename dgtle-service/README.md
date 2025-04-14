## 初始化构建nestjs项目
  ```javascript
  nest new dgtle-service
  ```

## 环境变量配置（mysql、redis）
1. 创建`/config/dev.yml` *(也可以通过env环境变量配置)*
2. 安装`@nestjs/config`包，用于管理环境变量、加载配置文件

  ```javascript
  npm i @nestjs/config
  ```
1. 配置package.json指令（windows需要不支持unix写法，需要安装cross-env），详细配置见package.json
2. `/src/appModule`中通过`ConfigModule`加载配置文件，设置全局变量
  - 加载全局环境变量配置
    ```javascript
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.${process.env.NODE_ENV}`, //该方式是通过env注入环境变量
      load: [dbconfig], // 加载/src/config中的yml配置文件
      cache: true,
    }),
    ```
  - typeorm异步加载数据库配置
    ```javascript
    // src/db/db.module.ts
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],  // 注入ConfigService,用于读取配置
      useFactory: async (configService: ConfigService) => { // 异步加载数据库配置
        return {
          type: 'mysql',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`], // 匹配任意层级下的所有实体文件 **/*.entity{.ts,.js} 表示匹配所有以 .ts 或 .js 结尾的文件。
          autoLoadEntities: true, // 自动加载实体文件，无需手动导入实体类。
          timezone: '+08:00', // 设置为中国标准时间
          ...config.get('db.mysql'), // 从配置文件中获取数据库连接信息
        } as TypeOrmModuleOptions;
    })
    ```

