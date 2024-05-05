import React, { useState, useEffect } from 'react'
import { getFiles } from '../../api/service'
const { Content } = Layout
import './filesTable.css'

import { Layout } from 'antd'
import { Upload, Image } from 'antd'
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
            onPreview={handlePreview}
            onChange={handleChange}
          >
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
  )
}
