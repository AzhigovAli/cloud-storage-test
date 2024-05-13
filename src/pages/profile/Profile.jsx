import './profile.css'
import React, { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { Avatar, Form, Button, Layout, Typography, message, Upload } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { changeAvatar } from '../../api/service'
const { Paragraph } = Typography

export const Profile = () => {
  const [user, setUser] = useState(null)
  const [fields, setFields] = useState({
    email: '',
    fullname: '',
    password: '',
    phone: '',
    avatarFile: null,
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${localStorage.getItem('id')}`)
        const userData = response.data
        setUser(userData)
        setFields({
          email: userData.email,
          fullname: userData.fullname,
          password: userData.password,
          phone: userData.phone,
          avatarFile: null,
        })
      } catch (error) {
        console.log('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [])

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0]
    setFields({ ...fields, avatarFile: file })
  }

  const updateUser = async () => {
    try {
      await axios.put(`/users/${localStorage.getItem('id')}`, {
        email: fields.email,
        fullname: fields.fullname,
        password: fields.password,
        phone: fields.phone,
      })
      message.success('User updated successfully')
    } catch (error) {
      message.error('Error updating user')
      console.log('Error updating user:', error)
    }
  }

  return (
    <Layout className="profile-layout">
      <div className="login-container">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          className="login-form"
        >
          {fields.avatarFile ? (
            <Avatar
              className="user-avatar"
              src={URL.createObjectURL(fields.avatarFile)}
            />
          ) : (
            <Avatar
              className="user-avatar"
              icon={<UserOutlined />}
              preview={false}
              src={user?.userAvatar}
            />
          )}
          <Form.Item>
            <Upload
              className="upload-avatar"
              accept="image/*"
              beforeUpload={async (file) => {
                handleAvatarChange({ target: { files: [file] } })
                await changeAvatar(localStorage.getItem('id'), file)
                return false
              }}
              showUploadList={false}
            >
              <Button>Change Avatar</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Email">
            <Paragraph
              className="data-user"
              editable={{
                onChange: (value) => setFields({ ...fields, email: value }),
              }}
            >
              {fields.email}
            </Paragraph>
          </Form.Item>
          <Form.Item label="Full Name">
            <Paragraph
              className="data-user"
              editable={{
                onChange: (value) => setFields({ ...fields, fullname: value }),
              }}
            >
              {fields.fullname}
            </Paragraph>
          </Form.Item>
          <Form.Item label="Password">
            <Paragraph
              className="data-user"
              editable={{
                onChange: (value) => setFields({ ...fields, password: value }),
              }}
            >
              {fields.password}
            </Paragraph>
          </Form.Item>
          <Form.Item label="Phone">
            <Paragraph
              className="data-user"
              editable={{
                onChange: (value) => setFields({ ...fields, phone: value }),
              }}
              type="number"
            >
              {fields.phone}
            </Paragraph>
          </Form.Item>
          <Form.Item>
            <Button className="back-button" type="primary" onClick={updateUser}>
              Save Changes
            </Button>
            <Link to="/">
              <Button className="back-button">Back</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  )
}
