import './index.css'
import React, { useEffect } from 'react'
import { menu } from './mock'
import Home from './pages/home/Home'
import { Profile } from './pages/profile/Profile'
import { Routes, Route, Link } from 'react-router-dom'
import { ChangePassword } from './pages/changePassword/ChangePassword'

const { Header } = Layout
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Typography } from 'antd'
import axios from './api/axios'

const App = () => {
  const token = localStorage.getItem('token')

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
            <Avatar icon={<UserOutlined />} className="user-avatar" />
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
