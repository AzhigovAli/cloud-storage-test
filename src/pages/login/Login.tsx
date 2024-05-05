import React, { useState } from 'react'
import './login.css'
import axios from '../../api/axios'
import { Form, Input, Button, message } from 'antd'
import { onFinishFailed } from '../../api/service'

export const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false)

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        `/auth/${isRegistering ? 'register' : 'login'}`,
        values
      )
      message.success('Success!')
      localStorage.setItem('id', data.id)
      localStorage.setItem('token', data.fullname)
      localStorage.setItem('userAvatar', data.userAvatar)
      window.location.reload()
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error)
      message.error('Error!')
    }
  }

  return (
    <div className="login-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <div className="toggle-container">
          <span>
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account yet?"}
          </span>
          <Button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Register'}
          </Button>
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="JGx1X@example.com" />
        </Form.Item>
        {isRegistering && (
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              { required: true, message: 'Please input your full name!' },
            ]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
        )}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="******" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {!isRegistering ? 'Login' : 'Register'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
