import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    const result = await sts.assumeRole(this.ossConfig.roleArn, '', '3600', 'GetStsTokenSession');
    console.log("🚀 ~ UploadService ~ getOssSign ~ result:", result)

    try {
    } catch (err) {
      console.error('获取临时凭证失败:', err.message);
      throw err;
    }
  }
}
