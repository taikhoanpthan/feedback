import imageAxiosClient from "./imageAxiosClient";

export const getSections = async () => {
  const { data } = await imageAxiosClient.get("/SectionManagement");
  return data;
};

export const createSection = async (payload) => {
  const { data } = await imageAxiosClient.post(
    "/SectionManagement",
    payload
  );

  return data;
};

export const updateSection = async (id, payload) => {
  const { data } = await imageAxiosClient.put(
    `/SectionManagement/${id}`,
    payload
  );

  return data;
};

export const deleteSection = async (id) => {
  const { data } = await imageAxiosClient.delete(
    `/SectionManagement/${id}`
  );

  return data;
};