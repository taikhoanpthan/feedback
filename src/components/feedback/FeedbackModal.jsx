import { useState } from "react";
import { Modal, message } from "antd";
import FeedbackForm from "./FeedbackForm";

import { createFeedback, updateFeedback } from "../services/feedbackService";

const FeedbackModal = ({ open, onClose, onSuccess, editingFeedback }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (editingFeedback) {
        await updateFeedback(editingFeedback.id, {
          ...editingFeedback,
          ...values,

          // Nếu VIP chọn ngày mới thì dùng ngày đó,
          // nếu không thì giữ nguyên ngày cũ.
          dateTime: values.dateTime
            ? values.dateTime.toISOString()
            : editingFeedback.dateTime,

          updatedAt: new Date().toISOString(),
        });
        message.success("Cập nhật feedback thành công!");
      } else {
        await createFeedback({
          ...values,

          // Ngày tạo
          dateTime:
            values.dateTime?.toISOString?.() || new Date().toISOString(),

          // Chưa cập nhật lần nào
          updatedAt: null,
        });

        message.success("Thêm feedback thành công!");
      }

      await onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      width={650}
      title={editingFeedback ? "Chỉnh sửa Feedback" : "Thêm Feedback"}
    >
      <FeedbackForm
        onFinish={handleSubmit}
        initialValues={editingFeedback}
        loading={loading}
      />
    </Modal>
  );
};

export default FeedbackModal;
