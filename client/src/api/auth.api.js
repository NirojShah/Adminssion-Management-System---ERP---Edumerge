import axiosInstance from "./axios";

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/user/login", data);
  return response.data;
};