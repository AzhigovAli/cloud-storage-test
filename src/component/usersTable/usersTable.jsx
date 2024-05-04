import React, { useState, useMemo, useCallback } from 'react';
import { changeAvatar, updateUser } from '../../api/service';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Table, Modal, Avatar, message, Input, Space, Button, Upload } from 'antd';

const { Content } = Layout;
const { Search } = Input;

export const UsersTable = ({ users, columns, onDelete }) => {
  const token = localStorage.getItem('token');
  const [searchText, setSearchText] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteMemoized = useCallback(
    async (user) => {
      Modal.confirm({
        title: 'Confirm',
        content: `Are you sure you want to delete user ${user.fullname}?`,
        async onOk() {
          if (token === user.fullname) {
            message.error('You cannot delete yourself.');
          } else {
            await onDelete(user);
            await message.success(`User ${user.fullname} deleted successfully.`);
            window.location.reload();
          }
        },
        onCancel() {},
      });
    },
    [token, onDelete],
  );

  const handleUpdateUserMemoized = useCallback(async () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      await changeAvatar(editingUser.id, formData);
    }
    await updateUser(editingUser.id, editingUser);
    closeModal();
    message.success(`User ${editingUser.fullname} updated successfully.`);
  }, [avatarFile, editingUser]);

  const filteredData = useMemo(() => {
    return users.filter((user) =>
      Object.values(user).some(
        (val) => val && val.toString().toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [users, searchText]);

  const closeModal = () => {
    setModalVisible(false);
    setEditingUser(null);
    setAvatarFile(null);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserClick = (user) => {
    setEditingUser({ ...user });
    setModalVisible(true);
  };

  const columnsWithActions = [
    ...columns,
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, user) => (
        <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDeleteMemoized(user)} />
      ),
    },
  ];

  return (
    <div>
      <Layout style={{ padding: '12px 0', borderRadius: '10px' }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Space style={{ marginBottom: 16 }}>
            <Search
              placeholder="Search by name"
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
            />
          </Space>
          <Table
            dataSource={searchText ? filteredData : users}
            columns={columnsWithActions}
            onRow={(record) => ({
              onClick: () => handleUserClick(record),
            })}
          />
          <Modal
            title="User Information"
            visible={modalVisible}
            onCancel={closeModal}
            footer={[
              <Button key="cancel" onClick={closeModal}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleUpdateUserMemoized}>
                Save Changes
              </Button>,
            ]}>
            {editingUser && (
              <div>
                <p>
                  <strong>ID:</strong> {editingUser.id}
                </p>
                <p>
                  <strong>Avatar:</strong>
                  {avatarFile ? (
                    <Avatar src={URL.createObjectURL(avatarFile)} />
                  ) : (
                    <Avatar src={editingUser.userAvatar} />
                  )}
                  <Upload
                    accept="image/*"
                    beforeUpload={(file) => {
                      setAvatarFile(file);
                      return false;
                    }}
                    showUploadList={false}>
                    <Button>Change Avatar</Button>
                  </Upload>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <Input name="phone" value={editingUser.phone} onChange={handleInputChange} />
                </p>
                <p>
                  <strong>Full Name:</strong>{' '}
                  <Input
                    name="fullname"
                    value={editingUser.fullname}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <Input name="email" value={editingUser.email} onChange={handleInputChange} />
                </p>
              </div>
            )}
          </Modal>
        </Content>
      </Layout>
    </div>
  );
};
