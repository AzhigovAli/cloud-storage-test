import React from 'react'
import './changePassword.css'
import axios from '../../api/axios'
import { onFinishFailed } from '../../api/service'
import { Form, Input, Button, message } from 'antd'

export const ChangePassword = () => {
  const onFinish = async (values) => {
    try {
      const { data } = await axios.patch(`/auth/reset-password`, values)
      message.success('Success!')
      localStorage.setItem('id', data.id)
      window.location.href = '/'
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
