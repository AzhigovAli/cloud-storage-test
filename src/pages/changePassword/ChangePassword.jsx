import React, { useState } from 'react';
import './changePassword.css';
import axios from '../../api/axios';
import { Form, Input, Button, message } from 'antd';

export const ChangePassword = () => {
  const onFinish = async (values) => {
    try {
      const { data } = await axios.patch(`/auth/reset-password`, values);
      message.success('Success!');
      localStorage.setItem('id', data.id);
      window.location.href = '/';
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      message.error('Error!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login-form">
        <div>
          <span>Change Password</span>
        </div>

        <Form.Item
          label="Password"
          name="password"
          style={{ marginTop: '20px' }}
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="******" />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
