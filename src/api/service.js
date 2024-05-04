import axios from './axios';

export const getUsers = async (id) => {
  try {
    const { data } = await axios.get('/users', { params: { id } });
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`/users/${id}`);
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const { data } = await axios.put(`/users/${id}`, user);
    return data;
  } catch (error) {
    console.log('Error updating user:', error);
    throw error;
  }
};

export const changeAvatar = async (id, avatar) => {
  try {
    const { data } = await axios.put(`/users/${id}/avatar`, avatar);
    return data;
  } catch (error) {
    console.log('Error changing avatar:', error);
    throw error;
  }
};

export const getFiles = async () => {
  try {
    const { data } = await axios.get('/file');
    return data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};
