import React from 'react'
import './changePassword.css'
import axios from '../../api/axios'
import { onFinishFailed } from '../../api/service'
import { Form, Input, Button, message } from 'antd'
import { create } from 'zustand'

export const useChangePasswordStore = create((set) => ({
  password: '',
  onFinish: async (password) => {
    try {
      const { data } = await axios.patch(`/auth/reset-password`, password)
      message.success('Success!')
      window.location.href = '/'
      return data
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error)
      message.error('Error!')
    }
  },
}))

export const ChangePassword = () => {
  const { onFinish } = useChangePasswordStore()
  if (!localStorage.getItem('token')) {
    window.location.href = '/'
  }
  return (
    <div className="login-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(password) => onFinish(password)}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <div>
          <span>Change Password</span>
        </div>
        <Form.Item
          label="Password"
          name="password"
          className="form-new-password"
          rules={[
            { required: true, message: 'Please input your new password!' },
          ]}
        >
          <Input.Password placeholder="******" />
        </Form.Item>
        <Form.Item>
          <Button className="submit-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
