import { getFiles } from '../../api/service';
import React, { useState, useEffect } from 'react';

const { Content } = Layout;
import { Layout } from 'antd';
import { Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from '../../api/axios';

export const FilesTable = () => {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    getFiles().then((data) => {
      setFileList(data);
    });
  }, []);

  return (
    <div>
      <Layout style={{ padding: '12px 0', borderRadius: '10px' }}>
        <Content style={{ padding: '0 24px', minHeight: 280, overflow: 'auto' }}>
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onRemove={() => axios.delete(`/file/${fileList.id}`)}
            onPreview={handlePreview}
            onChange={handleChange}>
            {uploadButton}
          </Upload>
          <Image
            src={previewImage}
            visible={previewOpen}
            onVisibleChange={setPreviewOpen}
            preview={false}
          />
        </Content>
      </Layout>
    </div>
  );
};
