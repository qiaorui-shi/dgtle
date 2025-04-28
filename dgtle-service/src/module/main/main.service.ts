import { RedisService } from '../../db/redis/redis.service';
import { UserService } from '../user/user.service';
import { RegistryUserDto, LoginUserDto } from './dto/index';

export class MainService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {}
  async getCaptchaImage() {}

  /**
   * @description: 注册用户
   * @param RegistryUserDto { CreateUserDto } 注册用户
   * */
  async registry(createUserDto: RegistryUserDto) {
    this.userService.registry(createUserDto);
  }

  /**
   * @description: 登录用户
   * @param loginUserDto { LoginUserDto } 登录用户
   * */
  async login(loginUserDto: LoginUserDto) {
    this.userService.login(loginUserDto);
  }
}
