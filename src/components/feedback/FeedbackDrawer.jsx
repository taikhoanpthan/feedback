import { Modal, Descriptions, Tag, Typography, Empty } from "antd";
import {
  CalendarOutlined,
  CoffeeOutlined,
  MessageOutlined,
  TableOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Paragraph } = Typography;

const FeedbackModalView = ({ open, onClose, feedback }) => {
  return (
    <Modal
      title="📋 Chi tiết Feedback"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      destroyOnClose
    >
      {!feedback ? (
        <Empty description="Chưa có dữ liệu" />
      ) : (
        <Descriptions
          column={1}
          bordered
          size="middle"
          labelStyle={{ width: 160, fontWeight: 600 }}
        >
          <Descriptions.Item
            label={
              <>
                <TableOutlined /> Số bàn
              </>
            }
          >
            <Tag color="blue">Bàn {feedback.tableNumber}</Tag>
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <>
                <CoffeeOutlined /> Khách ăn gì
              </>
            }
          >
            {feedback.meal}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <>
                <CalendarOutlined /> Ngày giờ
              </>
            }
          >
            {dayjs(feedback.dateTime).format("DD/MM/YYYY HH:mm")}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <>
                <MessageOutlined /> Feedback
              </>
            }
          >
            <Paragraph
              style={{ marginBottom: 0 }}
              ellipsis={{
                rows: 6,
                expandable: true,
                symbol: "Xem thêm",
              }}
            >
              {feedback.feedback}
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default FeedbackModalView;