import { useEffect, useState } from "react";
import { Button, DatePicker, Divider, Form, Input, Space, Tag } from "antd";
import dayjs from "dayjs";
import feedbackTags from "../../assets/feedbackTags";

const { TextArea } = Input;

const FeedbackForm = ({ onFinish, initialValues = null, loading = false }) => {
  const [form] = Form.useForm();

  const [showAllTags, setShowAllTags] = useState(false);
  const [isVip, setIsVip] = useState(false);

  const isEdit = !!initialValues;

  const visibleTags = showAllTags ? feedbackTags : feedbackTags.slice(0, 6);

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        customerName: initialValues.customerName || "",
        customerPhone: initialValues.customerPhone || "",
        tableNumber: initialValues.tableNumber,
        meal: initialValues.meal,
        feedback: initialValues.feedback,
        dateTime: initialValues.dateTime ? dayjs(initialValues.dateTime) : null,
      });
    } else {
      form.resetFields();
    }

    // Mở khóa VIP sau khi "chuyển khoản"
    setIsVip(sessionStorage.getItem("vipFeedback") === "true");

    // Không auto focus vào input khi mở form
    setTimeout(() => {
      if (
        document.activeElement &&
        typeof document.activeElement.blur === "function"
      ) {
        document.activeElement.blur();
      }
    }, 50);
  }, [form, initialValues, isEdit]);

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
    const submitData = {
      ...values,
      customerPhone: values.customerPhone?.trim() || "",
    };

    // Chỉ khi tạo mới mới gán ngày feedback
    if (!isEdit) {
      submitData.dateTime = values.dateTime
        ? values.dateTime.toISOString()
        : new Date().toISOString();
    }

    await onFinish(submitData);

    sessionStorage.removeItem("vipFeedback");
    setIsVip(false);

    if (!isEdit) {
      form.resetFields();
      setShowAllTags(false);
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={handleFinish}
    >
      {isEdit && (
        <>
          <Divider orientation="left">Thông tin khách hàng</Divider>

          <Form.Item label="Tên khách hàng" name="customerName">
            <Input autoFocus={false} placeholder="Ví dụ: Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="customerPhone"
            extra="Không bắt buộc. Chỉ nhập nếu khách hàng cung cấp."
            rules={[
              {
                validator(_, value) {
                  if (!value || value.trim() === "") {
                    return Promise.resolve();
                  }

                  const regex = /^(0|\+84)[0-9]{9,10}$/;

                  if (regex.test(value.trim())) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Số điện thoại không hợp lệ!"),
                  );
                },
              },
            ]}
          >
            <Input
              autoFocus={false}
              placeholder="Để trống nếu không có"
              maxLength={12}
              allowClear
            />
          </Form.Item>
        </>
      )}

      <Divider orientation="left">Thông tin Feedback</Divider>

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
        <Input autoFocus={false} placeholder="Ví dụ: C10, VIP01..." />
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
        <Input
          autoFocus={false}
          placeholder="Ví dụ: Buffet Standard, Alacarte..."
        />
      </Form.Item>

      {isVip && (
        <Form.Item
          label="📅 Ngày Feedback (VIP)"
          name="dateTime"
          extra="Nếu không chọn sẽ dùng ngày hiện tại."
        >
          <DatePicker
            className="w-full"
            format="DD/MM/YYYY"
            placeholder="Chọn ngày"
            disabledDate={(current) =>
              current && current > dayjs().endOf("day")
            }
          />
        </Form.Item>
      )}

      {isVip && (
        <div className="mb-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="mb-3 text-sm font-medium text-yellow-700">
            ✨ Tính năng VIP đã được mở khóa
          </p>

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
      )}

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
          autoFocus={false}
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
        {isEdit ? "Cập nhật Feedback" : "Lưu Feedback"}
      </Button>
    </Form>
  );
};

export default FeedbackForm;
