import imageAxiosClient from "./imageAxiosClient";

export const getImages = async () => {
  const { data } = await imageAxiosClient.get("/API_Test");
  return data;
};

export const createImage = async (payload) => {
  const { data } = await imageAxiosClient.post("/API_Test", payload);
  return data;
};

export const updateImage = async (id, payload) => {
  const { data } = await imageAxiosClient.put(`/API_Test/${id}`, payload);
  return data;
};

export const deleteImage = async (id) => {
  const { data } = await imageAxiosClient.delete(`/API_Test/${id}`);
  return data;
};
