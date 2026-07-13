import { useState } from "react";
import {
  Modal,
  Upload,
  Button,
  Input,
  message,
  Space,
} from "antd";

import {
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import { uploadImage } from "../services/cloudinaryService";
import { createImage } from "../services/imageService";

const { Dragger } = Upload;

const UploadImage = ({
  open,
  onClose,
  folder,
  onSuccess,
}) => {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadProps = {
    multiple: false,
    maxCount: 1,
    showUploadList: true,

    beforeUpload: (file) => {
      setFile(file);
      return false;
    },

    onRemove: () => {
      setFile(null);
    },
  };

  const handleUpload = async () => {
    if (!file) {
      message.warning("Vui lòng chọn ảnh.");
      return;
    }

    try {
      setLoading(true);

      // Upload lên Cloudinary
      const cloud = await uploadImage(file, folder);

      // Lưu MockAPI
      await createImage({
        folder,
        name: imageName || file.name,
        image: cloud.secure_url,
        publicId: cloud.public_id,
        createdAt: new Date().toISOString(),
      });

      message.success("Upload thành công!");

      setFile(null);
      setImageName("");

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
        setFile(null);
        setImageName("");
        onClose();
      }}
      footer={
        <Space>
          <Button onClick={onClose}>
            Hủy
          </Button>

          <Button
            type="primary"
            loading={loading}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Space>
      }
    >
      {/* <Input
        placeholder="Tên ảnh (không bắt buộc)"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
        style={{
          marginBottom: 20,
        }}
      /> */}

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
          Kéo thả ảnh vào đây
        </p>

        <p className="ant-upload-hint">
          hoặc nhấn để chọn ảnh
        </p>
      </Dragger>
    </Modal>
  );
};

export default UploadImage;