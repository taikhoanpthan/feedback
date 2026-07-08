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

export const createFeedback = async (feedbackData) => {
  try {
    const response = await axiosClient.post(END_POINT, {
      ...feedbackData,
      dateTime: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo feedback:", error.response || error);
    throw error; // Ném lỗi ra ngoài để UI nhận biết
  }
};

// Cập nhật feedback
export const updateFeedback = async (id, feedbackData) => {
  const { data } = await axiosClient.put(`${END_POINT}/${id}`, feedbackData);

  return data;
};

// Xóa feedback
export const deleteFeedback = async (id) => {
  const { data } = await axiosClient.delete(`${END_POINT}/${id}`);

  return data;
};
