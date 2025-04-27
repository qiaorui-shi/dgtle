import { RightOutline } from "antd-mobile-icons";
import { List, Image } from "antd-mobile";
import { loadImg } from "@/utils";
import "./index.scss";
const Mine: React.FC = () => {
  // 用户信息组件
  const UserInfo: React.FC = () => {
    return (
      <div className="user-info">
        <div className="user-avatar">
          <Image className="user-img" fit="cover" src={loadImg(`/assets/img/avatar.png`)} />{" "}
        </div>
        <div className="user-name">
          <p className="name">着迷哟</p>
          <p className="text">查看或编辑个人资料</p>
        </div>
        <div className="more-icon">
          <RightOutline />
        </div>
      </div>
    );
  };

  const DataPanelComp: React.FC = () => {
    return (
      <div className="data-panel">
        <div className="data-item">
          <span className="text">创作</span>
          <span className="count">14</span>
        </div>
        <div className="line"></div>
        <div className="data-item">
          <span className="text">粉丝</span>
          <span className="count">16</span>
        </div>
        <div className="line"></div>
        <div className="data-item">
          <span className="text">收藏</span>
          <span className="count">0</span>
        </div>
        <div className="line"></div>
        <div className="data-item">
          <span className="text">获赞</span>
          <span className="count">132</span>
        </div>
      </div>
    );
  };

  const UserSysMenu: React.FC = () => {
    return (
      <div className="menu">
        <div className="entry-menu">
          <List>
            <List.Item prefix={<i className="iconfont icon-dianpin" />} onClick={() => {}}>
              点评
            </List.Item>
            <List.Item prefix={<i className="iconfont icon-zhongce" />} onClick={() => {}}>
              众测
            </List.Item>
            <List.Item prefix={<i className="iconfont icon-huodong" />} onClick={() => {}}>
              活动
            </List.Item>
            <List.Item prefix={<i className="iconfont icon-xianzhi" />} onClick={() => {}}>
              闲置
            </List.Item>
          </List>
        </div>
        <div className="sys-menu">
          <List>
            <List.Item prefix={<i className="iconfont icon-caogaoxiang" />} onClick={() => {}}>
              草稿箱
            </List.Item>
            <List.Item prefix={<i className="iconfont icon-eyes" />} onClick={() => {}}>
              深色模式
            </List.Item>
            <List.Item prefix={<i className="iconfont icon-fankui" />} onClick={() => {}}>
              反馈/帮助
            </List.Item>
            <List.Item prefix={<i className="iconfont icon-setting" />} onClick={() => {}}>
              设置
            </List.Item>
          </List>
        </div>
      </div>
    );
  };

  return (
    <div className="mine-page">
      <UserInfo />
      <DataPanelComp />
      <UserSysMenu />
    </div>
  );
};

export default Mine;
