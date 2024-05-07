import React, { useState, useEffect } from 'react'
import { deleteFile, getFiles } from '../../api/service'
const { Content } = Layout
import './filesTable.css'

import { Layout } from 'antd'
import { Upload, Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

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
    console.log(file.id)
    console.log(file.response)
    await deleteFile(file.id || file.response.id)
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
