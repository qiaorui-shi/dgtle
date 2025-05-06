import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResultData } from 'src/common/utils/result';
import { STS } from 'ali-oss';

@Injectable()
export class UploadService {
  private ossConfig;
  constructor(@Inject(ConfigService) private config: ConfigService) {
    this.ossConfig = {
      accessKeyId: this.config.get('alioss.accessKeyId'),
      accessKeySecret: this.config.get('alioss.accessKeySecret'),
      roleArn: this.config.get('alioss.roleArn'),
    };
  }

  /**
   * 获取STS token临时凭证
   * */
  async getOssSign() {
    // 初始化STS
    const sts = new STS({
      accessKeyId: this.ossConfig.accessKeyId,
      accessKeySecret: this.ossConfig.accessKeySecret,
    });
    try {
      const result = await sts.assumeRole(this.ossConfig.roleArn, '', '3600', 'GetStsTokenSession');
      console.log("🚀 ~ UploadService ~ getOssSign ~ result:", result)
      return ResultData.success(200, '成功', {
        accessKeyId: result.credentials.AccessKeyId,
        accessKeySecret: result.credentials.AccessKeySecret,
        securityToken: result.credentials.SecurityToken,
      });
    } catch (error) {
      return ResultData.fail(500, '获取凭证失败');
    }
  }
}
