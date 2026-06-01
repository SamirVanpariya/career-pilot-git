import api from "@/lib/axios";

// Register
export const registerUserAPI = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Login
export const loginUserAPI = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};
// Me
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};
// // Logout
// export const logoutUser = async () => {
//   const res = await api.post("/auth/logout");
//   return res.data;
// };


