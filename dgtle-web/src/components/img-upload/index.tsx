import React, { useState, useRef } from "react";
import { ImageUploader, Toast } from "antd-mobile";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import * as UploadApi from "@/api/module/upload";
import * as UploadType from "./types";
import "./index.scss";
import OSS from "ali-oss";

// 基础用法
const UploadImg: React.FC<UploadType.UploadImgProps> = ({ value, onChange, businessPath = "default", maxSize = 10, maxLength = 1 }) => {
  const [fileList] = useState<ImageUploadItem[]>(value || []);
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
    const fileTypeList = ["image/jpeg", "image/png"];

    if (fileList.length >= maxLength) {
      Toast.show(`文件数量不能超过${maxLength}个`);
      return false;
    }
    if (file.size > maxSize * 1024 * 1024) {
      Toast.show(`文件大小不能超过${maxSize}M`);
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
      const sign = await UploadApi.getOssSign();
      ossSign.current = sign;
      return sign;
    } catch {
      return null;
    }
  };

  // 上传前钩子
  const beforeUpload = async (file: File) => {
    const isValid = checkFile(file);
    if (!isValid) return null;
    const sign = await getOssSign();
    if (!sign) return null;
    return file;
  };

  const createOssPath = (file: string) => {
    const userInfo = sessionStorage.getItem("userInfo"); // 用户ID
    const userId = userInfo ? JSON.parse(userInfo).id : "";
    const time = new Date().getTime();
    const fileArr = file.split(".");
    // 设置路径  应用/用户ID/业务名/文件类型/文件名+时间戳
    return `dgtle/${userId}/${businessPath}/images/${fileArr[0] + time}.${fileArr[1]}`;
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
    const fileOssPath = createOssPath(file.name);
    let result: OSS.MultipartUploadResult | OSS.PutObjectResult;
    if (fileSize > 10) {
      // 分片上传
      result = await ossSession.multipartUpload(fileOssPath, file, {
        // 获取分片上传进度、断点和返回值。
        progress: (p: number, cpt: unknown) => {
          console.log("🚀 ~ handleUpload ~ p:", p);
          console.log("🚀 ~ handleUpload ~ cpt:", cpt);
        },
        // 设置并发上传的分片数量。
        parallel: 4,
        // 设置分片大小。默认值为1 MB，最小值为100 KB。
        partSize: 1 * 1024 * 1024
      });
    } else {
      // 普通上传
      result = await ossSession.put(fileOssPath, file);
    }
    const url = import.meta.env.VITE_APP_STATIC_URL + result.name;
    return { url };
  };

  return (
    <div>
      <ImageUploader value={fileList} columns={3} maxCount={maxLength} multiple onChange={onChange} beforeUpload={beforeUpload} upload={handleUpload} />
    </div>
  );
};

export default UploadImg;
