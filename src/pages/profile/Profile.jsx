import './profile.css'
import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'

import { Form } from 'antd'
import { Button, Input, Layout, theme } from 'antd'
import { Link } from 'react-router-dom'

export const Profile = () => {
  const [user, setUser] = useState([])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    try {
      axios.get(`/users/${localStorage.getItem('id')}`).then((data) => {
        setUser([data.data])
        console.log(user)
      })
    } catch (error) {
      console.log('Error fetching users:', error)
      console.log(user)
    }
  }, [])
  console.log(user)

  return (
    <Layout className="profile-layout">
      <div className="login-container">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          className="login-form"
        >
          <Form.Item label="Email">
            <Input
              placeholder="JGx1X@example.com"
              value={user.map((user) => user.email)}
            />
          </Form.Item>
          <Form.Item label="Full Name">
            <Input
              placeholder="John Doe"
              value={user.map((user) => user.fullname)}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password value={user.map((user) => user.password)} />
          </Form.Item>
          <Form.Item>
            <Link to="/">
              <Button className="back-button" type="primary" htmlType="submit">
                Back to Home
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  )
}
