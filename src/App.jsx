import './index.css'
import React from 'react'
import { menu } from './mock'
import Home from './pages/home/Home'
import { Profile } from './pages/profile/Profile'
import { Routes, Route, Link } from 'react-router-dom'
import { ChangePassword } from './pages/changePassword/ChangePassword'

const { Header } = Layout
import { Avatar, Dropdown, Layout, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const App = () => {
  const token = localStorage.getItem('token')
  const userAvatar = localStorage.getItem('userAvatar')
  const { originalname } = JSON.parse(userAvatar)

  return (
    <>
      <Header className="header">
        <Link to="/">
          <Typography strong className="header-text">
            Cloud Storage
          </Typography>
        </Link>
        <Dropdown overlay={menu} placement="bottomRight">
          <div className="login">
            <Typography strong className="user-name">
              {token}
            </Typography>
            {originalname ? (
              <img src={originalname} className="user_avatar" />
            ) : (
              <Avatar
                className="user-avatar"
                icon={<UserOutlined />}
                preview={false}
              />
            )}
          </div>
        </Dropdown>
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </>
  )
}
export default App
