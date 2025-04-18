import { Image, Cell } from 'react-vant'
import {
  Arrow,
  Chat,
  Label,
  SendGift,
  Bag,
  Invitation,
  BrowsingHistory,
  Comment,
  Setting
} from '@react-vant/icons'
import { loadImg } from '@/utils'
import './index.scss'
const Mine: React.FC = () => {
  // 用户信息组件
  const UserInfo: React.FC = () => {
    return (
      <div className='user-info'>
        <div className='user-avatar'>
          <Image
            className='user-img'
            round
            fit='cover'
            src={loadImg(`/assets/img/avatar.png`)}
          />{' '}
        </div>
        <div className='user-name'>
          <p className='name'>着迷哟</p>
          <p className='text'>查看或编辑个人资料</p>
        </div>
        <div className='more-icon'>
          <Arrow />
        </div>
      </div>
    )
  }

  const DataPanelComp: React.FC = () => {
    return (
      <div className='data-panel'>
        <div className='data-item'>
          <span className='text'>创作</span>
          <span className='count'>14</span>
        </div>
        <div className='line'></div>
        <div className='data-item'>
          <span className='text'>粉丝</span>
          <span className='count'>16</span>
        </div>
        <div className='line'></div>
        <div className='data-item'>
          <span className='text'>收藏</span>
          <span className='count'>0</span>
        </div>
        <div className='line'></div>
        <div className='data-item'>
          <span className='text'>获赞</span>
          <span className='count'>132</span>
        </div>
      </div>
    )
  }

  const UserSysMenu: React.FC = () => {
    return (
      <div className='menu'>
        <div className='entry-menu'>
          <Cell title={'点评'} icon={<Chat />} />
          <Cell title={'众测'} icon={<Label />} />
          <Cell title={'活动'} icon={<SendGift />} />
          <Cell title={'闲置'} icon={<Bag />} />
        </div>
        <div className='sys-menu'>
          <Cell title={'草稿箱'} icon={<Invitation />} />
          <Cell title={'深色模式'} icon={<BrowsingHistory />} />
          <Cell title={'反馈/帮助'} icon={<Comment />} />
          <Cell title={'设置'} icon={<Setting />} />
        </div>
      </div>
    )
  }

  return (
    <div className='mine-page'>
      <UserInfo />
      <DataPanelComp />
      <UserSysMenu />
    </div>
  )
}

export default Mine
