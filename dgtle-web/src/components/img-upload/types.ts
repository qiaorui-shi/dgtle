import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";

export interface UploadImgProps {
  value: ImageUploadItem[];
  onChange: (value: ImageUploadItem[]) => void; // 图片地址数组变化时的回调函数
  businessPath?: string; // 业务路径
  maxSize?: number; // 图片大小限制
  maxLength?: number; // 图片最大数量限制
}
