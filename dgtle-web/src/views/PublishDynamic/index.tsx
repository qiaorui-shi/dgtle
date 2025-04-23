import React, { useEffect, useState } from "react";
import "./index.scss";
import { Cell, Input } from "react-vant";
import { Cross } from "@react-vant/icons";
import { loadImg } from "@/utils";

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
  const containerRef = React.useRef<HTMLDivElement>(null);

  const Header: React.FC = () => {
    return (
      <div className="header">
        <div className="back">
          <Cross />
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
          <Cell>
            <Input.TextArea placeholder="请输入你的想法..." autoSize={{ minHeight: 100, maxHeight: 160 }} maxLength={200} showWordLimit />
          </Cell>
        </div>
        <div className="content-img">
          {imgList && imgList.length === 0 && <div className="add"></div>}
          <div className="show-box" ref={containerRef}>
            {imgList.map((item, index) => {
              return (
                <div className="img-item" key={index}>
                  <img src={loadImg(item)} alt="" />
                </div>
              );
            })}
          </div>
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
