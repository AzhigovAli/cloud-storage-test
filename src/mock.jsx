import {
  UserOutlined,
  FileImageOutlined,
  UserSwitchOutlined,
  KeyOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

const handleLogout = () => {
  window.location.reload()
  localStorage.removeItem('token')
}

export const menu = (
  <Menu>
    <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
    <Menu.Divider />
    <Link to="/changePassword">
      <Menu.Item key="changePassword" icon={<KeyOutlined />}>
        Change Password
      </Menu.Item>
    </Link>
    <Menu.Divider />
    <Link to="/profile">
      <Menu.Item key="profile" icon={<UserSwitchOutlined />}>
        Profile
      </Menu.Item>
    </Link>
  </Menu>
)

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullname',
    key: 'fullname',
  },
]

export const sideBarItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'users',
  },
  {
    key: '2',
    icon: <FileImageOutlined />,
    label: 'files',
  },
]
