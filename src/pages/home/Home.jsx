import './home.css'
import { Login } from '../login/Login'
import { sideBarItems, columns } from '../../mock'
import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../../api/service'
import { UsersTable } from '../../component/usersTable/usersTable'
import { FilesTable } from '../../component/filesTable/filesTable'

const { Content, Sider } = Layout
import { Layout, Menu } from 'antd'

const Home = () => {
  const [users, setUsers] = useState([])
  const [selectedMenuItem, setSelectedMenuItem] = useState('1')
  const token = localStorage.getItem('token')

  function handleMenuClick(item) {
    setSelectedMenuItem(item.key)
  }

  const handleDelete = (user) => {
    deleteUser(user.id)
  }

  useEffect(() => {
    if (token) {
      getUsers().then((data) => {
        setUsers(data)
      })
    }
  }, [token])

  return (
    <Layout className="layout">
      {!token ? (
        <Login />
      ) : (
        token && (
          <Content className="content">
            <Layout className="layout-content">
              <Sider className="sider" width={200}>
                <Menu
                  mode="inline"
                  selectedKeys={[selectedMenuItem]}
                  defaultOpenKeys={['sub1']}
                  onClick={handleMenuClick}
                  className="menu"
                  items={sideBarItems}
                />
              </Sider>
              <Content className="users-table">
                {selectedMenuItem === '1' ? (
                  <UsersTable
                    users={users}
                    columns={columns}
                    onDelete={handleDelete}
                  />
                ) : (
                  <FilesTable />
                )}
              </Content>
            </Layout>
          </Content>
        )
      )}
    </Layout>
  )
}

export default Home
