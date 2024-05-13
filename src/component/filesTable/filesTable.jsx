import React, { useState, useEffect } from 'react'
import './filesTable.css'
const { Content } = Layout
import { deleteFile, getFiles, getBase64 } from '../../api/service'

import { Upload, Image } from 'antd'
import { Layout, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const FilesTable = () => {
  const [fileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList }) => {
    setFileList(fileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  const handleDeleteFile = async (file) => {
    try {
      await deleteFile(file.id || file.response.id)
      message.success('File deleted successfully')
    } catch (error) {
      message.error('Error deleting file')
      console.log('Error deleting file:', error)
    }
  }

  useEffect(() => {
    getFiles().then((data) => {
      setFileList(data)
    })
  }, [])

  return (
    <div>
      <Layout className="files-table-layout">
        <Content className="files-table-content">
          <Upload
            action="http://localhost:5555/file"
            listType="picture-card"
            fileList={fileList}
            onRemove={handleDeleteFile}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: 'none',
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        </Content>
      </Layout>
    </div>
  )
}
