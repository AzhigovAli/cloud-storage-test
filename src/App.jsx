import './index.css';
import { Login } from './pages/login/Login';
import { sideBarItems, columns, menu } from './mock';
import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from './api/service';
import { UsersTable } from './component/usersTable/usersTable';
import { FilesTable } from './component/filesTable/filesTable';

const { Header, Content, Sider } = Layout;
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Typography, Avatar, Dropdown } from 'antd';
import { Profile } from './pages/profile/Profile';
import { ChangePassword } from './pages/changePassword/ChangePassword';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = localStorage.getItem('token');

  function handleMenuClick(item) {
    setSelectedMenuItem(item.key);
  }

  const handleDelete = (user) => {
    deleteUser(user.id);
  };

  useEffect(() => {
    if (token) {
      getUsers().then((data) => {
        setUsers(data);
      });
    }
  }, [token]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Typography strong style={{ color: '#fff', fontSize: '28px' }}>
          Cloud Storage
        </Typography>
        <Dropdown overlay={menu} placement="bottomRight">
          <div className="login">
            <Typography strong style={{ color: '#fff' }}>
              {token}
            </Typography>
            <Avatar
              icon={<UserOutlined />}
              style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            />
          </div>
        </Dropdown>
      </Header>
      {window.location.pathname === '/profile' ? <Profile /> : null}
      {window.location.pathname === '/changePassword' ? <ChangePassword /> : null}
      {!token &&
      window.location.pathname !== '/profile' &&
      window.location.pathname !== '/changePassword' ? (
        <Login />
      ) : (
        token &&
        window.location.pathname !== '/profile' &&
        window.location.pathname !== '/changePassword' && (
          <Content
            style={{
              margin: '150px 0px',
              padding: '0 300px',
            }}>
            <Layout
              style={{
                padding: '12px 0',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}>
              <Sider
                style={{
                  background: colorBgContainer,
                }}
                width={200}>
                <Menu
                  mode="inline"
                  selectedKeys={[selectedMenuItem]}
                  defaultOpenKeys={['sub1']}
                  onClick={handleMenuClick}
                  style={{
                    height: '100%',
                  }}
                  items={sideBarItems}
                />
              </Sider>
              <Content
                style={{
                  padding: '0 24px',
                  minHeight: 280,
                }}>
                {selectedMenuItem === '1' ? (
                  <UsersTable users={users} columns={columns} onDelete={handleDelete} />
                ) : (
                  <FilesTable />
                )}
              </Content>
            </Layout>
          </Content>
        )
      )}
    </Layout>
  );
};
export default App;
