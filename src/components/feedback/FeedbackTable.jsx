import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const FeedbackTable = ({
  data = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => index + 1,
    },

    {
      title: "Ngày",
      dataIndex: "dateTime",
      width: 220,
      render: (_, record) => (
        <div>
          <div>
            <strong>Tạo:</strong>{" "}
            {dayjs(record.dateTime).format("DD/MM/YYYY HH:mm")}
          </div>

          {record.updatedAt && record.updatedAt !== record.dateTime && (
            <div className="text-xs text-gray-500 mt-1">
              <strong>Cập nhật:</strong>{" "}
              {dayjs(record.updatedAt).format("DD/MM/YYYY HH:mm")}
            </div>
          )}
        </div>
      ),
    },

    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      width: 180,
      render: (value) =>
        value || <span className="text-gray-400 italic">Chưa có</span>,
    },

    {
      title: "SĐT",
      dataIndex: "customerPhone",
      key: "customerPhone",
      width: 150,
      render: (value) =>
        value || <span className="text-gray-400 italic">Chưa có</span>,
    },

    {
      title: "Số bàn",
      dataIndex: "tableNumber",
      width: 150,
      align: "center",
      render: (tableNumber) => (
        <div
          className="
        inline-block
        rounded-full
        bg-blue-50
        text-blue-600
        border border-blue-200
        px-3 py-1
        whitespace-normal
        break-words
        max-w-full
      "
        >
          {tableNumber}
        </div>
      ),
    },

    {
      title: "Khách ăn gì",
      dataIndex: "meal",
      key: "meal",
      width: 180,
    },

    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      ellipsis: true,
      render: (text) => (
        <Tooltip>
          <span>{text}</span>
        </Tooltip>
      ),
    },

    {
      title: "Thao tác",
      key: "action",
      width: 170,
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip>
            <Button
              type="primary"
              ghost
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>

          <Tooltip>
            <Button
              color="gold"
              variant="outlined"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>

          <Popconfirm
            description="Bạn chắc chắn muốn xóa feedback này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.id)}
          >
            <Tooltip>
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 mb-12">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        bordered
        scroll={{
          x: 1400,
          scrollToFirstRowOnChange: false,
        }}
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
          showLessItems: true,
          responsive: true,
          showTotal: (total) => `Tổng ${total} feedback`,
        }}
      />
    </div>
  );
};

export default FeedbackTable;
