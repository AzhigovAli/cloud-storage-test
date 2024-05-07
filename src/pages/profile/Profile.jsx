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
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${localStorage.getItem('id')}`)
        const userData = response.data
        setUser(userData)
        setEmail(userData.email)
        setFullname(userData.fullname)
        setPassword(userData.password)
        setPhone(userData.phone)
      } catch (error) {
        console.log('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [])

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail)
  }

  const handleFullnameChange = (newFullname) => {
    setFullname(newFullname)
  }

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword)
  }

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone)
  }

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0]
    setAvatarFile(file)
  }

  const updateUser = async () => {
    try {
      await axios.put(`/users/${localStorage.getItem('id')}`, {
        email,
        fullname,
        password,
        phone,
      })
      await changeAvatar(user.id, avatarFile)
      message.success('User updated successfully')
      console.log('User updated successfully')
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
          {avatarFile ? (
            <Avatar
              className="user-avatar"
              src={URL.createObjectURL(avatarFile)}
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
              beforeUpload={(file) => {
                handleAvatarChange({ target: { files: [file] } })
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
              editable={{ onChange: handleEmailChange }}
            >
              {email}
            </Paragraph>
          </Form.Item>
          <Form.Item label="Full Name">
            <Paragraph
              className="data-user"
              editable={{ onChange: handleFullnameChange }}
            >
              {fullname}
            </Paragraph>
          </Form.Item>
          <Form.Item label="Password">
            <Paragraph
              className="data-user"
              editable={{ onChange: handlePasswordChange }}
            >
              {password}
            </Paragraph>
          </Form.Item>
          <Form.Item label="Phone">
            <Paragraph
              className="data-user"
              editable={{ onChange: handlePhoneChange }}
              type="number"
            >
              {phone}
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
