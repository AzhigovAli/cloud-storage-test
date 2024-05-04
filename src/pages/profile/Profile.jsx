import './profile.css';
const { Content, Sider } = Layout;
import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, theme } from 'antd';
import { Form } from 'antd';

import axios from '../../api/axios';

export const Profile = () => {
  const [user, setUser] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    try {
      axios.get('/users').then((data) => {
        setUser(data.data);
      });
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  }, []);

  return (
    <Layout
      style={{
        padding: '12px 0',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
      <div className="login-container">
        <Form name="basic" initialValues={{ remember: true }} className="login-form">
          <Form.Item label="Email">
            <Input placeholder="JGx1X@example.com" value={user.map((user) => user.email)} />
          </Form.Item>
          <Form.Item label="Full Name">
            <Input placeholder="John Doe" value={user.map((user) => user.fullname)} />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password value={user.map((user) => user.password)} />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => (window.location.href = '/')}
              type="primary"
              htmlType="submit">
              Back to Home
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};
