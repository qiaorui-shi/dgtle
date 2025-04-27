import "./index.scss";
import { Tabs, Swiper, SearchBar } from "antd-mobile";
import { loadImg } from "../../utils";
import { useState } from "react";

const Home: React.FC = () => {
  const imgList = ["1", "2", "3"];
  const [value, setValue] = useState("");

  // Header组件
  const Header: React.FC = () => {
    return (
      <div className="header">
        <Tabs
          style={{
            "--active-line-color": "#2d3f56",
            "--active-title-color": "#2d3f56",
            "--title-font-size": "14px"
          }}
        >
          <Tabs.Tab title="首页" key="1"></Tabs.Tab>
          <Tabs.Tab title="视频" key="2"></Tabs.Tab>
        </Tabs>
      </div>
    );
  };

  // nav
  const NavBar: React.FC = () => {
    return <div></div>;
  };

  const Dynamic: React.FC = () => {
    return (
      <div className="article-list">
        <div className="article">
          <div className="article-user">
            <div className="article-user-img">
              <img src={loadImg(`/assets/img/avatar.png`)} />
            </div>
            <span>Ahwang17th</span>
          </div>

          <div className="article-img-box">
            <div className="img-cover">
              <img src={loadImg(`/assets/img/2.png`)} />
            </div>
            <div className="img-cover">
              <img src={loadImg(`/assets/img/3.png`)} />
            </div>
            <div className="img-cover">
              <img src={loadImg(`/assets/img/4.png`)} />
            </div>
          </div>

          <div className="article-text">《买回当初想要的东西》第二十四期: Nokia N97 mini 一代机皇mini版 记得当初...</div>

          <div className="article-bottom">
            <div className="article-like">
              <div className="article-like-img">
                <img />
              </div>
              <span className="article-like-count"></span>
            </div>
            <div className="article-info">
              <span className="article-time">8小时前</span> | <span>动态</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-home">
      {/* header */}
      <Header></Header>

      {/* search */}
      <div className="search">
        <SearchBar value={value} onSearch={setValue} placeholder="搜索数字尾巴内容" clearable />
      </div>

      {/* swiper */}
      <div className="swiper">
        <Swiper slideSize={80} trackOffset={10}>
          {imgList.map((item, index) => (
            <Swiper.Item key={index}>
              <img className="swiper-item" src={loadImg(`/assets/img/${item}.png`)} />
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      {/* nav */}
      <NavBar></NavBar>

      {/* dynamic */}
      <Dynamic></Dynamic>
    </div>
  );
};

export default Home;
