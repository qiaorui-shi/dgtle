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

    typeOrm的在nest中使用解析：
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

## 实现用户注册&登录
  1. 安装依赖包: `npm i bcryptjs`
  2. 注册接口：通过`bcrypt.genSaltSync`生成（特定字符串）盐，通过bcrypt.hashSync生成哈希值对密码加密，将信息存入数据库
  3. 登录接口：通过`bcrypt.compareSync`比较密码是否一致，判断是否登录成功
  4. 登录成功生成`uuid`，将`uuid+userId`生成session，将session作为key,用户信息作为value存入redis，并将session存入cookie，返回token

## 实现守卫Guard
  1. 实现
     - 通过继承@nestjs/passport的AuthGuard('jwt')实现jwt认证（@nestjs/passport通过策略模式已经帮我们处理好了很多东西）
     - 直接xxxGuard implements CanActivate,实现nestjs提供的CanActivate方法,自定义守卫逻辑
  2. 使用方式
     - 通过app.useGlobalGuards(new xxxGuard())方法注入,因为是手动new的，一般guard中依赖其它服务，nest不知道怎么给它注入依赖（不推荐）
     - 在app.module.ts中通过providers注入（推荐）

## 通过STS SDK获取临时访问凭证授权实现oss bucket上传下载（适用于客户端获取token通过ali-oss sdk上传文件）
  https://help.aliyun.com/zh/oss/use-cases/uploading-objects-to-oss-directly-from-clients/?spm=a2c4g.11186623.help-menu-31815.d_6_1.5c986075uAxNPR
  1. 通过创建一个用户，给他调用STS服务的AssumeRole接口的权限，这里会生成一个AccessKeyId和AccessKeySecret
  2. 再创建一个角色，给这个角色读取对应bucket的权限
  3. 通过用户的AccessKeyId和AccessKeySecret调用STS服务获取临时凭证

  疑问：
  - Q:已经有用户了，为什么还要创建角色给对应桶的权限，而不是直接给用户权限？
    A:用户的AccessKeyId和AccessKeySecret是永久的，如果给了其权限，就能一直操作bucket了，不安全，而给角色权限，让用户来临时扮演这个角色获取凭证，会更安全。

  安全授权其它方案：
  1. 服务端生成PostObject所需的签名和Post Policy（对于需要限制上传文件属性的场景，注：不支持分片上传大文件和基于分片断点续传的场景）
  2. 服务端生成PutObject所需的签名URL（对于简单上传文件的场景）

## nsetjs使用过程中的疑问
1. 什么情况下需要使用controller、service、module?
   - 需要提供http等接口时候，也就是业务模块，需要用到controller、service、module。
   - 不需要提供http等接口时，像mysql连接，则只需要module即可。其它类似的像utils,common等一般也就只需要module。
   - 像redis连接，需要module，但是service根据实际情况而定，如果需要封装一些方法，则可以使用service。
  
  总结：一个模块如果涉及接口则使用controller；service是否需要根据是否有需要封装的逻辑来决定。

## 其它
  1. `path-to-regexp`库，将地址转换为正则表达式，示例：路由白名单转换成正则再对当前请求的路由进行正则校验
  2. `@nestjs/jwt` `passport-jwt` `@nestjs/passport` `passport`
    - @nestjs/jwt是nestjs对jsonWebToken的封装，提供了jwt的生成、验证等方法
    - passport-jwt是passport.js的jwt策略，提供Straegy类，支持从请求头提取token
    - @nestjs/passport是nestjs对Passport.js的封装，提供了AuthGuard类，PassportStrategy抽象类，方便继承和实现策略
    - passport是一个认证中间件，提供了多种认证策略，需要配合具体策略使用