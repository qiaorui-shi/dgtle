import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as Sts20150401 from '@alicloud/sts20150401';
import * as OpenApi from '@alicloud/openapi-client';
import * as Util from '@alicloud/tea-util';
import * as Credential from '@alicloud/credentials';

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
    // 初始化Credentials Client
    const credentialsConfig = new Credential.Config({
      type: 'sts',
      accessKeyId: this.ossConfig.accessKeyId,
      accessKeySecret: this.ossConfig.accessKeySecret,
    });
    const credential = new Credential.default(credentialsConfig);
    const clientConfig = new OpenApi.Config({
      credential: credential,
    });
    // 创建STS客户端实例
    const client = new Sts20150401.default(clientConfig);
    // 构建一个AssumeRoleRequest实例，用于指定角色信息和会话名称
    const assumeRoleRequest = new Sts20150401.AssumeRoleRequest({
      roleArn: this.ossConfig.roleArn,
      roleSessionName: 'upload-session',
      durationSeconds: 3600,
    });

    try {
      // 创建RutimeOptions实例，用于指定请求的运行时选项
      const runtime = new Util.RuntimeOptions({});
      const result = await client.assumeRoleWithOptions(assumeRoleRequest, runtime);
      const credentials = result.body?.credentials;
      return {
        accessKeyId: credentials?.accessKeyId,
        accessKeySecret: credentials?.accessKeySecret,
        securityToken: credentials?.securityToken,
        expiration: credentials?.expiration,
        region: this.ossConfig.region,
        bucket: this.ossConfig.bucket,
      };
    } catch (err) {
      console.error('获取临时凭证失败:', err.message);
      throw err;
    }
  }
}
