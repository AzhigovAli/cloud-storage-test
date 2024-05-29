import React from 'react'
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
    <div className="flex justify-center items-center mt-[150px]">
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
          className="mt-5"
          rules={[
            { required: true, message: 'Please input your new password!' },
          ]}
        >
          <Input.Password placeholder="******" />
        </Form.Item>
        <Form.Item>
          <Button className="w-[100%]" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
