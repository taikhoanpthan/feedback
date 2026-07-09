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
      width: 180,
      render: (_, record) => (
        <div>
          <div>{dayjs(record.dateTime).format("DD/MM/YYYY HH:mm")}</div>

          {record.updatedAt && (
            <div className="text-xs text-gray-500">
              Cập nhật:{" "}
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
      render: (value) => value || (
        <span className="text-gray-400 italic">Chưa có</span>
      ),
    },

    {
      title: "SĐT",
      dataIndex: "customerPhone",
      key: "customerPhone",
      width: 150,
      render: (value) => value || (
        <span className="text-gray-400 italic">Chưa có</span>
      ),
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
            <Tooltip >
              <Button
                danger
                icon={<DeleteOutlined />}
              />
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
        scroll={{ x: 1400 }}
      />
    </div>
  );
};

export default FeedbackTable;