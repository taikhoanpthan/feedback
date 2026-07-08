import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
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
      key: "dateTime",
      width: 180,
      render: (date) => (
        <span>{dayjs(date).format("DD/MM/YYYY HH:mm")}</span>
      ),
      sorter: (a, b) => new Date(a.dateTime) - new Date(b.dateTime),
      defaultSortOrder: "descend",
    },

    {
      title: "Số bàn",
      dataIndex: "tableNumber",
      key: "tableNumber",
      width: 120,
      align: "center",
      render: (tableNumber) => (
        <Tag color="blue">Bàn {tableNumber}</Tag>
      ),
    },

    {
      title: "Ăn gì",
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
        <Tooltip title={text}>
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
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              ghost
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>

          <Tooltip title="Chỉnh sửa">
            <Button
              color="gold"
              variant="outlined"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>

          <Popconfirm
            title="Xóa Feedback"
            description="Bạn chắc chắn muốn xóa feedback này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.id)}
          >
            <Tooltip title="Xóa">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        bordered
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
          showTotal: (total) => `Tổng ${total} feedback`,
        }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default FeedbackTable;