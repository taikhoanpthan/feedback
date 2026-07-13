import { Card, Typography, Tag } from "antd";
import { FolderOpenFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

const EmployeeCard = ({ name, count = 0, onClick }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      className="cursor-pointer rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      styles={{ body: { padding: 24 } }}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 shadow-md">
          <FolderOpenFilled style={{ fontSize: 28, color: "#fff" }} />
        </div>

        <div className="flex-1 min-w-0">
          <Title level={5} className="!mb-1 !truncate" title={name}>
            {name}
          </Title>

          {/* <Text type="secondary">Ảnh google</Text> */}
        </div>

        <Tag color="blue" className="!rounded-full !px-3">
          {count} ảnh
        </Tag>
      </div>
    </Card>
  );
};

export default EmployeeCard;