import React, { useEffect, useState } from "react";
import "./index.scss";
import { CloseOutline } from "antd-mobile-icons";
import { TextArea } from "antd-mobile";
// import { loadImg } from "@/utils";
import ImageUpload from "@/components/img-upload";

const PublishDynamic: React.FC = () => {
  const [imgList, setImgList] = useState<string[]>([
    "/assets/img1/2.png",
    "/assets/img1/3.png",
    "/assets/img1/4.png",
    "/assets/img1/2.png",
    "/assets/img1/3.png",
    "/assets/img1/4.png",
    "/assets/img1/2.png",
    "/assets/img1/3.png",
    "/assets/img1/4.png"
  ]);

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
          <TextArea placeholder="请输入你的想法..." rows={5} maxLength={200} showCount />
        </div>
        <div className="content-img">
          <ImageUpload></ImageUpload>
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
