import {
  Card,
  Image,
  Button,
  Tooltip,
  Typography,
  Popconfirm,
} from "antd";

import {
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const ImageCard = ({ image, onDelete }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(image.image);

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = `${image.folder}-${Date.now()}.jpg`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      window.open(image.image, "_blank");
    }
  };

  return (
    <Card
      hoverable
      className="rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      styles={{
        body: {
          padding: 14,
        },
      }}
      cover={
        <Image
          src={image.image}
          height={220}
          preview
          style={{
            objectFit: "cover",
          }}
        />
      }
    >
      <Text
        type="secondary"
        className="block mb-4"
      >
        {new Date(image.createdAt).toLocaleString("vi-VN")}
      </Text>

      <div className="flex justify-between items-center">
        <Tooltip title="Download">
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          />
        </Tooltip>

        <Popconfirm
          title="Xóa ảnh này?"
          okText="Xóa"
          cancelText="Hủy"
          onConfirm={() => onDelete(image.id)}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </div>
    </Card>
  );
};

export default ImageCard;