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
          onClick={() => handleNavigate('/Home')}
          className={isActive('/Home') ? 'active' : ''}
        >
          <div className='icon'>
            {isActive('/Home') ? <WapHome /> : <WapHomeO />}
          </div>
          <span>首页</span>
        </li>
        <li
          onClick={() => handleNavigate('/Interest')}
          className={isActive('/Interest') ? 'active' : ''}
        >
          <div className='icon'>
            {isActive('/Interest') ? <Star /> : <StarO />}
          </div>
          <span>兴趣</span>
        </li>
        <li onClick={() => handleNavigate('/PublishDynamic')} className='add'>
          <Add />
        </li>
        <li
          onClick={() => handleNavigate('/Message')}
          className={isActive('/Message') ? 'active' : ''}
        >
          <div className='icon'>
            {isActive('/Message') ? <SmileComment /> : <SmileCommentO />}
          </div>
          <span>消息</span>
        </li>
        <li
          onClick={() => handleNavigate('/Mine')}
          className={isActive('/Mine') ? 'active' : ''}
        >
          <div className='icon'>
            {isActive('/Mine') ? <Smile /> : <SmileO />}
          </div>
          <span>我的</span>
        </li>
      </ul>
    </div>
  )
}

export default Footer
