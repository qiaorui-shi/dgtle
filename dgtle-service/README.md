## 初始化构建nestjs项目
  ```javascript
  nest new dgtle-service
  ```
## 环境变量配置（mysql、redis）
### mysql
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
  - 因为nestjs打包只会将ts文件打包到dist下，所以yml文件需要在nest-cli.json中配置
  ```javascript
  {
    "compilerOptions": {
      "assets": ["config/*.yml"] // 配置yml文件
    }
  }
  ```
  - 数据库相关的库: `mysql2`、`@nestjs/typeorm`

### redis
  和mysql类似
  需要用到的相关的库: `redis`、`@nestjs-modules/ioredis`

## 静态资源目录
  1. 通过app.useStaticAssets()
  ```javascript
  // 静态文件目录 使用useStaticAssets方法必须在create时指定类型为NestExpressApplication （本质还是nest中对expree进行了封装）
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '', // 访问路径前缀
  }),
  ```
  2. 直接引入express
  ```javascript
  import * as express from 'express'; // 引入express
  app.use('/static', express.static(join(__dirname, '..', 'static')));
  ```

## 通过管道进行接口校验
  1. 安装依赖包: `npm i class-validator class-transformer`
  2. 创建`src/common/pipes/validate.pipe.ts`文件，用于校验接口参数,并返回第一个错误（class-validate会返回所有错误）
  3. 全局使用校验管道: `app.useGlobalPipes(new ValidationPipe());`

## 全局异常过滤器/统一异常返回格式
  1. 创建`src/common/filters/http-exception.filter.ts`文件，用于全局异常捕获
  2. 自定义异常类 `HttpExceptionFilter` 实现 `ExceptionFilter` 中的catch方法
  3. 通过`ArgumentsHost`获取response和request, 通过exception获取错误信息
  4. 统一处理异常返回格式并返回

# 实现用户注册&登录
  1. 安装依赖包: `npm i bcryptjs`
  2. 注册接口：通过bcrypt.genSaltSync生成（特定字符串）盐，通过bcrypt.hashSync生成哈希值对密码加密，将信息存入数据库
  3. 登录接口：通过bcrypt.compareSync比较密码是否一致，判断是否登录成功
  4. 登录成功生成uuid，将uuid+userId生成session，将session作为key,用户信息作为value存入redis，并将session存入cookie，返回token

# nsetjs使用过程中的疑问
1. 什么情况下需要使用controller、service、module?
   - 需要提供http等接口时候，也就是业务模块，需要用到controller、service、module。
   - 不需要提供http等接口时，像mysql连接，则只需要module即可。其它类似的像utils,common等一般也就只需要module。
   - 像redis连接，需要module，但是service根据实际情况而定，如果需要封装一些方法，则可以使用service。
  
  总结：一个模块如果涉及接口则使用controller；service是否需要根据是否有需要封装的逻辑来决定。
