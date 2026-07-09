import axiosClient from "./axiosClient";

const END_POINT = "/feedback";

// Lấy tất cả feedback
export const getAllFeedback = async () => {
  const { data } = await axiosClient.get(END_POINT);
  return data;
};

// Lấy feedback theo id
export const getFeedbackById = async (id) => {
  const { data } = await axiosClient.get(`${END_POINT}/${id}`);
  return data;
};

// Thêm feedback
export const createFeedback = async (feedbackData) => {
  try {
    const { data } = await axiosClient.post(END_POINT, {
      ...feedbackData,
      dateTime:
        feedbackData.dateTime || new Date().toISOString(),
    });

    return data;
  } catch (error) {
    console.error("Lỗi khi tạo feedback:", error.response || error);
    throw error;
  }
};

// Cập nhật feedback
export const updateFeedback = async (id, feedbackData) => {
  const { data } = await axiosClient.put(`${END_POINT}/${id}`, {
    ...feedbackData,
    updatedAt: new Date().toISOString(),
  });

  return data;
};

// Xóa feedback
export const deleteFeedback = async (id) => {
  const { data } = await axiosClient.delete(`${END_POINT}/${id}`);
  return data;
};