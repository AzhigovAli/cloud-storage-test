import {
  UserOutlined,
  FileImageOutlined,
  UserSwitchOutlined,
  KeyOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const handleLogout = () => {
  window.location.reload();
  localStorage.removeItem('token');
};

export const menu = (
  <Menu>
    <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={handleLogout} key="changePassword" icon={<KeyOutlined />}>
      Change Password
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item
      key="profile"
      onClick={() => (window.location.pathname = '/profile')}
      icon={<UserSwitchOutlined />}>
      Profile
    </Menu.Item>
  </Menu>
);

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
];

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
];
