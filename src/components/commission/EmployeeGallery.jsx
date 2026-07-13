import { useMemo, useState } from "react";
import dayjs from "dayjs";

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
  DatePicker,
  Space,
} from "antd";

import {
  ArrowLeftOutlined,
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  PictureOutlined,
  FolderOpenFilled,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const EmployeeGallery = ({
  folder,
  images = [],
  loading = false,
  onBack,
  onUpload,
  onDelete,
}) => {
  // Mặc định là tháng hiện tại
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  // Lọc theo tháng + năm
  const filteredImages = useMemo(() => {
    return images.filter((item) =>
      dayjs(item.createdAt).isSame(selectedMonth, "month"),
    );
  }, [images, selectedMonth]);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = "";
    link.click();
  };

  return (
    <div>
      {/* ================= Header ================= */}

      <Card
        bordered={false}
        className="mb-8 rounded-[28px] shadow-sm"
        styles={{
          body: {
            padding: 24,
          },
        }}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
            />

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 shadow-lg">
              <FolderOpenFilled
                style={{
                  color: "#fff",
                  fontSize: 28,
                }}
              />
            </div>

            <div>
              <Title level={3} className="!mb-1">
                {folder}
              </Title>

              <Text type="secondary">
                {filteredImages.length} ảnh • {selectedMonth.format("MM/YYYY")}
              </Text>
            </div>
          </div>

          {/* Right */}
          <Space wrap>
            <DatePicker
              picker="month"
              allowClear={false}
              value={selectedMonth}
              onChange={(value) => value && setSelectedMonth(value)}
              suffixIcon={<CalendarOutlined />}
            />

            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              onClick={onUpload}
            >
              Upload ảnh
            </Button>
          </Space>
        </div>
      </Card>

      {/* ================= Loading ================= */}

      {loading && (
        <div className="flex justify-center py-24">
          <Spin size="large" />
        </div>
      )}

      {/* ================= Empty ================= */}

      {!loading && filteredImages.length === 0 && (
        <Card bordered={false} className="rounded-[28px]">
          <Empty
            image={<PictureOutlined style={{ fontSize: 64 }} />}
            description={
              <>
                <div className="text-base font-medium">
                  Không có ảnh trong {selectedMonth.format("MM/YYYY")}
                </div>

                <div className="mt-2 text-gray-500">
                  Hãy chọn tháng khác hoặc upload thêm ảnh.
                </div>
              </>
            }
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={onUpload}>
              Upload ảnh
            </Button>
          </Empty>
        </Card>
      )}

      {/* ================= Gallery ================= */}

      {!loading && filteredImages.length > 0 && (
        <Row gutter={[24, 24]}>
          {" "}
          {filteredImages.map((item) => (
            <Col key={item.id} xs={12} sm={12} md={8} lg={6} xl={6}>
              <Card
                hoverable
                className="overflow-hidden rounded-[24px] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                <Text type="secondary" className="mb-4 block">
                  {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                </Text>

                <div className="flex justify-between">
                  <Tooltip title="Tải xuống">
                    <Button
                      shape="circle"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownload(item.image)}
                    />
                  </Tooltip>

                  <Popconfirm
                    title="Xóa ảnh?"
                    description="Ảnh này sẽ bị xóa vĩnh viễn."
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{
                      danger: true,
                    }}
                    onConfirm={() => onDelete(item.id)}
                  >
                    <Button danger shape="circle" icon={<DeleteOutlined />} />
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
