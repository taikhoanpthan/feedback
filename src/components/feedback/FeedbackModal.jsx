import { useState } from "react";
import { Modal, message } from "antd";
import FeedbackForm from "./FeedbackForm";

import {
  createFeedback,
  updateFeedback,
} from "../services/feedbackService";

const FeedbackModal = ({
  open,
  onClose,
  onSuccess,
  editingFeedback,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const data = {
        tableNumber: values.tableNumber,
        meal: values.meal,
        feedback: values.feedback,
        dateTime: new Date().toISOString(),
      };

      if (editingFeedback) {
        // Chế độ chỉnh sửa
        await updateFeedback(editingFeedback.id, data);
        message.success("Cập nhật feedback thành công!");
      } else {
        // Chế độ thêm mới
        await createFeedback(data);
        message.success("Thêm feedback thành công!");
      }

      // Load lại danh sách
      await onSuccess();

      // Đóng modal
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
      width={650}
      destroyOnClose
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