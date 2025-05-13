import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { CloseOutline } from "antd-mobile-icons";
import { TextArea, Toast } from "antd-mobile";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import ImageUpload from "@/components/img-upload";
import * as DynamicApi from "@/api/module/dynamic/index";

const PublishDynamic: React.FC = () => {
  const navgate = useNavigate();
  const [text, setText] = useState("");
  const [imgList, setImgList] = useState<ImageUploadItem[]>([]);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(!text && imgList?.length <= 0);
  }, [text, imgList]);

  const publish = async () => {
    if (disabled) return;
    const imgListParam = imgList.map((item) => item.url);
    await DynamicApi.publishDynamic({ dynamic_text: text, dynamic_images: imgListParam });
    Toast.show("发布成功");
  };

  const back = () => {
    navgate(-1);
  };

  return (
    <div className="publish-dynamic-page">
      {/* Header */}
      <div className="header">
        <div className="back">
          <CloseOutline onClick={back} />
        </div>
        <div className="title">发动态</div>
        <div className="publish">
          <button className={disabled ? "publish-btn is-disabled" : "publish-btn"} onClick={publish}>
            发布
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="content-text">
          <TextArea placeholder="请输入你的想法..." value={text} onChange={(value) => setText(value)} rows={5} maxLength={200} showCount />
        </div>
        <div className="content-img">
          <ImageUpload value={imgList} onChange={(value) => setImgList([...value])} maxLength={9} />
        </div>
      </div>
    </div>
  );
};

export default PublishDynamic;
