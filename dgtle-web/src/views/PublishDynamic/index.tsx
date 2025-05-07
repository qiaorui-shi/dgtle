import React, { useState } from "react";
import "./index.scss";
import { CloseOutline } from "antd-mobile-icons";
import { TextArea } from "antd-mobile";
// import { loadImg } from "@/utils";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import ImageUpload from "@/components/img-upload";

const PublishDynamic: React.FC = () => {
  const [imgList, setImgList] = useState<ImageUploadItem[]>([]);
  const [text, setText] = useState("");

  const changeImgList = (value: ImageUploadItem[]) => {
    setImgList([...value]);
  };

  const Header: React.FC = () => {
    return (
      <div className="header">
        <div className="back">
          <CloseOutline />
        </div>
        <div className="title">发动态</div>
        <div className="publish">
          <button className="publish-btn">发布</button>
        </div>
      </div>
    );
  };
  const ContentInfo: React.FC = () => {
    return (
      <div className="content">
        <div className="content-text">
          <TextArea placeholder="请输入你的想法..." value={text} onChange={(val) => setText(val)} rows={5} maxLength={200} showCount />
        </div>
        <div className="content-img">
          <ImageUpload value={imgList} onChange={(value) => changeImgList(value)} maxLength={9}></ImageUpload>
        </div>
      </div>
    );
  };

  return (
    <div className="publish-dynamic-page">
      <Header />
      <ContentInfo />
    </div>
  );
};

export default PublishDynamic;
