import './index.scss'
import {
  WapHome,
  WapHomeO,
  Star,
  StarO,
  Add,
  SmileComment,
  SmileCommentO,
  Smile,
  SmileO
} from '@react-vant/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const Footer: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <div className='footer'>
      <ul className='nav'>
        <li
          onClick={() => handleNavigate('/home')}
          className={isActive('/home') ? 'active' : ''}
        >
          <div className='icon'>
            {isActive('/home') ? <WapHome /> : <WapHomeO />}
          </div>
          <span>首页</span>
        </li>
        <li
          onClick={() => handleNavigate('/interest')}
          className={isActive('/interest') ? 'active' : ''}
        >
          <div className='icon'>
            {isActive('/interest') ? <Star /> : <StarO />}
          </div>
          <span>兴趣</span>
        </li>
        <li onClick={() => handleNavigate('/home')} className='add'>
          <Add />
        </li>
        <li
          onClick={() => handleNavigate('/message')}
          className={isActive('/message') ? 'active' : ''}
        >
          <div className='icon'>
            {isActive('/message') ? <SmileComment /> : <SmileCommentO />}
          </div>
          <span>消息</span>
        </li>
        <li
          onClick={() => handleNavigate('/mine')}
          className={isActive('/mine') ? 'active' : ''}
        >
          <div className='icon'>
            {isActive('/mine') ? <Smile /> : <SmileO />}
          </div>
          <span>我的</span>
        </li>
      </ul>
    </div>
  )
}

export default Footer
