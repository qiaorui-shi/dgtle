import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description: 生成token
   * @param payload { uuid: string; userId: string }
   * */
  createToken(payload: { uuid: string; userId: string }) {
    return this.jwtService.sign(payload);
  }

  /**
   * @description: 解析token
   * @param token string
   * */
  parseToken(token: string) {
    if (!token) return null;
    try {
      const payload = this.jwtService.verify(token.replace('Bearer ', ''));
      return payload;
    } catch (error) {
      return null;
    }
  }
}
