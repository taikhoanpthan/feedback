import { useState } from "react";
import {
  Modal,
  Upload,
  Button,
  message,
  Space,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { uploadImage } from "../services/cloudinaryService";
import { createImage } from "../services/imageService";

const { Dragger } = Upload;

const UploadImage = ({
  open,
  onClose,
  folder,
  onSuccess,
}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFiles([]);
  };

  const uploadProps = {
    multiple: true,
    maxCount: 20, // Có thể đổi hoặc bỏ nếu muốn không giới hạn
    showUploadList: true,

    beforeUpload: () => false,

    onChange: ({ fileList }) => {
      setFiles(fileList);
    },

    onRemove: (file) => {
      setFiles((prev) =>
        prev.filter((item) => item.uid !== file.uid)
      );
    },

    fileList: files,
  };

  const handleUpload = async () => {
    if (!files.length) {
      message.warning("Vui lòng chọn ảnh.");
      return;
    }

    try {
      setLoading(true);

      await Promise.all(
        files.map(async ({ originFileObj }) => {
          const cloud = await uploadImage(
            originFileObj,
            folder
          );

          return createImage({
            folder,
            name: originFileObj.name,
            image: cloud.secure_url,
            publicId: cloud.public_id,
            createdAt: new Date().toISOString(),
          });
        })
      );

      message.success(
        `Upload thành công ${files.length} ảnh!`
      );

      resetForm();

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      message.error("Upload thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title={`Upload ảnh - ${folder}`}
      onCancel={() => {
        resetForm();
        onClose();
      }}
      destroyOnClose
      footer={
        <Space>
          <Button
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Hủy
          </Button>

          <Button
            type="primary"
            loading={loading}
            onClick={handleUpload}
          >
            Upload {files.length > 0 && `(${files.length})`}
          </Button>
        </Space>
      }
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined
            style={{
              fontSize: 42,
              color: "#1677ff",
            }}
          />
        </p>

        <p className="ant-upload-text">
          Kéo thả nhiều ảnh vào đây
        </p>

        <p className="ant-upload-hint">
          Hoặc nhấn để chọn nhiều ảnh cùng lúc
        </p>
      </Dragger>
    </Modal>
  );
};

export default UploadImage;