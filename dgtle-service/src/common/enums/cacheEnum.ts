/**
 * @description 缓存key的枚举
 * */

export enum CacheEnum {
  /**
   * @description 登录用户 redis key
   */
  LOGIN_TOKEN_KEY = 'login_tokens:',

  /**
   * @description 验证码 redis key
   */
  CAPTCHA_CODE_KEY = 'captcha_codes:',
}
