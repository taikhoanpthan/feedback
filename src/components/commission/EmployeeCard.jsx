import {
  Card,
  Typography,
  Tag,
  Popconfirm,
} from "antd";

import {
  FolderOpenFilled,
  PictureOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const EmployeeCard = ({
  name,
  count = 0,
  previews = [],
  onClick,
  onDelete,
}) => {
  const visiblePreviews = previews.slice(0, 3);
  const remaining = count - visiblePreviews.length;

  const handleDeleteConfirm = (e) => {
    e?.stopPropagation();
    onDelete?.();
  };

  return (
    <Card
      hoverable
      onClick={onClick}
      className="group relative rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      styles={{
        body: {
          padding: 22,
        },
      }}
    >
      {/* Delete button */}
      <Popconfirm
        title="Xóa thư viện ảnh"
        description={`Toàn bộ ảnh của ${name} sẽ bị xóa vĩnh viễn.`}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
        onConfirm={handleDeleteConfirm}
        onCancel={(e) => e?.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Xóa thư viện ảnh của ${name}`}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center
            bg-white/90 border border-gray-100 text-gray-400 shadow-sm
            opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
            hover:!text-red-500 hover:!border-red-200 hover:!bg-red-50
            transition-all duration-200"
        >
          <DeleteOutlined style={{ fontSize: 14 }} />
        </button>
      </Popconfirm>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center shadow-md shadow-orange-200">
          <FolderOpenFilled style={{ fontSize: 26, color: "#fff" }} />
        </div>

        <Tag className="!m-0 !mr-9 rounded-full !bg-blue-50 !border-blue-100 !text-blue-600 px-3 py-1 font-medium">
          {count} ảnh
        </Tag>
      </div>

      {/* Name */}
      <div className="mt-4">
        <Title
          level={5}
          className="!mb-0.5 !truncate"
          title={name}
        >
          {name}
        </Title>
        <Text type="secondary" className="text-sm">
          Thư viện ảnh cá nhân
        </Text>
      </div>

      {/* Preview */}
      <div className="flex gap-2 mt-4">
        {visiblePreviews.length ? (
          <>
            {visiblePreviews.map((img, index) => {
              const isLast = index === visiblePreviews.length - 1;
              const showOverlay = isLast && remaining > 0;

              return (
                <div
                  key={index}
                  className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-100"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {showOverlay && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Text className="!text-white font-semibold text-sm">
                        +{remaining}
                      </Text>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-5 rounded-xl border border-dashed border-gray-200 bg-gray-50/60">
            <PictureOutlined className="text-gray-300 text-lg" />
            <Text type="secondary" className="text-sm">
              Chưa có ảnh nào
            </Text>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
        <Text strong className="text-[15px] text-gray-700 group-hover:text-blue-600 transition-colors">
          Xem thư viện
        </Text>

        <ArrowRightOutlined
          className="transition-transform duration-300 group-hover:translate-x-1"
          style={{ fontSize: 16, color: "#1677ff" }}
        />
      </div>
    </Card>
  );
};

export default EmployeeCard;