import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="footer">
      <ul className="nav">
        <li onClick={() => handleNavigate("/Home")} className={isActive("/Home") ? "active" : ""}>
          <div className="icon">{isActive("/Home") ? <i className="iconfont icon-shouye" /> : <i className="iconfont icon-shouye1" />}</div>
          <span>首页</span>
        </li>
        <li onClick={() => handleNavigate("/Interest")} className={isActive("/Interest") ? "active" : ""}>
          <div className="icon">{isActive("/Interest") ? <i className="iconfont icon-xingqu" /> : <i className="iconfont icon-xingqu1" />}</div>
          <span>兴趣</span>
        </li>
        <li onClick={() => handleNavigate("/PublishDynamic")} className="add">
          <i className="iconfont icon-add add" />
        </li>
        <li onClick={() => handleNavigate("/Message")} className={isActive("/Message") ? "active" : ""}>
          <div className="icon">{isActive("/Message") ? <i className="iconfont icon-xiaoxi" /> : <i className="iconfont icon-xiaoxi1" />}</div>
          <span>消息</span>
        </li>
        <li onClick={() => handleNavigate("/Mine")} className={isActive("/Mine") ? "active" : ""}>
          <div className="icon">{isActive("/Mine") ? <i className="iconfont icon-wode" /> : <i className="iconfont icon-wode1" />}</div>
          <span>我的</span>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
