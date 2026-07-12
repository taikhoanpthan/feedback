import {
  Row,
  Col,
  Image,
  Typography,
  Button,
  Empty,
  Spin,
  Tooltip,
  Popconfirm,
  Card,
} from "antd";

import {
  ArrowLeftOutlined,
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const EmployeeGallery = ({
  folder,
  images = [],
  loading,
  onBack,
  onUpload,
  onDelete,
}) => {
  const handleDownload = (url) => {
    const link = document.createElement("a");

    link.href = url;

    link.target = "_blank";

    link.download = "";

    link.click();
  };

  return (
    <div>
      {/* Header */}

      <Card
        bordered={false}
        className="rounded-[28px] shadow-sm mb-8"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

          <div className="flex items-center gap-4">

            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
            />

            <div>

              <Title
                level={2}
                className="!mb-0"
              >
                📁 {folder}
              </Title>

              <Text type="secondary">
                {images.length} hình ảnh
              </Text>

            </div>

          </div>

          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            onClick={onUpload}
          >
            Upload ảnh
          </Button>

        </div>
      </Card>

      {loading ? (
        <div className="py-24 flex justify-center">
          <Spin size="large" />
        </div>
      ) : images.length === 0 ? (
        <Card
          className="rounded-[28px]"
        >
          <Empty
            image={<PictureOutlined style={{ fontSize: 60 }} />}
            description="Chưa có ảnh nào"
          />
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          {images.map((item) => (
            <Col
              key={item.id}
              xs={12}
              sm={12}
              md={8}
              lg={6}
              xl={6}
            >
              <Card
                hoverable
                className="rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                styles={{
                  body: {
                    padding: 14,
                  },
                }}
                cover={
                  <Image
                    src={item.image}
                    preview
                    height={240}
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
                  {new Date(
                    item.createdAt
                  ).toLocaleString("vi-VN")}
                </Text>

                <div className="flex justify-between">

                  <Tooltip title="Download">

                    <Button
                      shape="circle"
                      icon={<DownloadOutlined />}
                      onClick={() =>
                        handleDownload(item.image)
                      }
                    />

                  </Tooltip>

                  <Popconfirm
                    title="Xóa ảnh?"
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={() =>
                      onDelete(item.id)
                    }
                  >

                    <Button
                      danger
                      shape="circle"
                      icon={<DeleteOutlined />}
                    />

                  </Popconfirm>

                </div>

              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default EmployeeGallery;