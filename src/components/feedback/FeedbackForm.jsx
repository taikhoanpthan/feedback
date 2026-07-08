import { useEffect, useState } from "react";
import { Button, Form, Input, Tag, Space, Divider } from "antd";
import feedbackTags from "../../assets/feedbackTags";

const { TextArea } = Input;

const FeedbackForm = ({ onFinish, initialValues = null, loading = false }) => {
  const [form] = Form.useForm();
  const [showAllTags, setShowAllTags] = useState(false);

  const visibleTags = showAllTags ? feedbackTags : feedbackTags.slice(0, 6);
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        tableNumber: initialValues.tableNumber,
        meal: initialValues.meal,
        feedback: initialValues.feedback,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleTagClick = (tag) => {
    const current = form.getFieldValue("feedback") || "";

    const list = current
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (list.includes(tag)) return;

    form.setFieldsValue({
      feedback: current ? `${current}, ${tag}` : tag,
    });
  };

  const handleFinish = async (values) => {
    await onFinish(values);

    if (!initialValues) {
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Số bàn"
        name="tableNumber"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số bàn!",
          },
        ]}
      >
        <Input placeholder="Ví dụ: T1, T2, VIP01..." />
      </Form.Item>

      <Form.Item
        label="Khách ăn gì?"
        name="meal"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập món ăn!",
          },
        ]}
      >
        <Input placeholder="Ví dụ: Buffet Standard, Alacarte..." />
      </Form.Item>

      <Divider orientation="left">Chọn nhanh Feedback</Divider>

      <div className="mb-5">
        <Space wrap size={[8, 10]}>
          {visibleTags.map((tag) => (
            <Tag
              key={tag}
              color="processing"
              className="cursor-pointer select-none rounded-full px-3 py-1 text-sm transition-all hover:scale-105 hover:shadow"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Tag>
          ))}

          {feedbackTags.length > 6 && (
            <Tag
              color="default"
              className="cursor-pointer rounded-full px-3 py-1 font-medium"
              onClick={() => setShowAllTags(!showAllTags)}
            >
              {showAllTags
                ? "Thu gọn ▲"
                : `Xem thêm (${feedbackTags.length - 6}) ▼`}
            </Tag>
          )}
        </Space>
      </div>

      <Form.Item
        label="Feedback"
        name="feedback"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập feedback!",
          },
        ]}
      >
        <TextArea
          rows={5}
          maxLength={500}
          showCount
          placeholder="Nhập feedback của khách hàng..."
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={loading}
      >
        {initialValues ? "Cập nhật Feedback" : "Lưu Feedback"}
      </Button>
    </Form>
  );
};

export default FeedbackForm;
