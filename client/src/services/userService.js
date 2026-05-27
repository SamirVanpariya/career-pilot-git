import api from "@/lib/axios";

// GET all users
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};
