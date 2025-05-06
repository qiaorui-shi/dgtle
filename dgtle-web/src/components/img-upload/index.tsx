import React, { useState, useRef } from "react";
import { ImageUploader, Toast } from "antd-mobile";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import * as uploadApi from "@/api/module/upload";
import "./index.scss";
import OSS from "ali-oss";

// 基础用法
const UploadImg: React.FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [progressValue, setProgressValue] = useState<number>(0);
  const ossSign = useRef<{
    accessKeyId: string;
    accessKeySecret: string;
    securityToken: string;
  }>({
    accessKeyId: "",
    accessKeySecret: "",
    securityToken: ""
  });

  // 校验文件列表
  const checkFile = (file: File): boolean => {
    const fileSizeLimit = 10 * 1024 * 1024;
    const fileTypeList = ["image/jpeg", "image/png"];
    const maxFiles = 1;

    if (fileList.length > maxFiles) {
      Toast.show("文件数量不能超过1个");
      return false;
    }
    if (file.size > fileSizeLimit) {
      Toast.show("文件大小不能超过10M");
      return false;
    }
    if (!fileTypeList.includes(file.type)) {
      Toast.show("文件格式错误，仅支持 JPG/PNG");
      return false;
    }
    return true;
  };

  // 获取 OSS 签名
  const getOssSign = async () => {
    try {
      const sign = await uploadApi.getOssSign();
      ossSign.current = sign;
      return sign;
    } catch {
      return null;
    }
  };

  // 上传前钩子
  const beforeUpload = async (file: File): Promise<File | null> => {
    const isValid = checkFile(file);
    if (!isValid) return null;
    const sign = await getOssSign();
    if (!sign) return null;
    return file;
  };

  const createOssPath = (file: string) => {
    const userInfo = localStorage.getItem("userInfo"); // 用户ID
    const userId = userInfo ? JSON.parse(userInfo).id : "";
    const ossPath = "dynamic"; // 业务关联
    const time = new Date().getTime();
    const fileArr = file.split(".");
    // 设置路径  应用/用户ID/业务名/文件类型/文件名+时间戳
    return `dgtle/${userId}/${ossPath}/images/${fileArr[0] + time}.${fileArr[1]}`;
  };

  //   上传文件
  const handleUpload = async (file: File) => {
    const ossSession = new OSS({
      region: "oss-cn-hangzhou",
      accessKeyId: ossSign.current.accessKeyId,
      accessKeySecret: ossSign.current.accessKeySecret,
      stsToken: ossSign.current.securityToken,
      bucket: "dgtle"
    });
    const fileSize = file.size / 1024 / 1024;
    const userInfo = localStorage.getItem("userInfo"); // 用户ID
    const userId = userInfo ? JSON.parse(userInfo).id : "";
    const ossPath = "images"; // 业务关联
    if (fileSize < 10) {
      // 分片上传
      const res = await ossSession.multipartUpload(createOssPath(file.name), file, {
        // 获取分片上传进度、断点和返回值。
        progress: (p: number, cpt: any) => {
          setProgressValue(p * 100 || 1);
        }
      });
      setFileList((fileList) => [...fileList, { url: import.meta.env.VITE_APP_STATIC_URL + res.name }]);
      return {
        url: import.meta.env.VITE_APP_STATIC_URL + res.name
      };
    } else {
      // 普通上传
      const res = ossSession.put({ key: `/web/${userId}/${ossPath}`, file: file });
      console.log("🚀 ~ ossSession.multipartUpload ~ res:", res);
      return {
        url: import.meta.env.VITE_APP_STATIC_URL + res.name
      };
    }
  };
  return (
    <div>
      <ImageUploader columns={3} value={fileList} onChange={setFileList} beforeUpload={beforeUpload} upload={handleUpload} />
    </div>
  );
};

export default UploadImg;
