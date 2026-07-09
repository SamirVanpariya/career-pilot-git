import api from "@/lib/axios";

// ========== NOTIFICATIONS ==========
export const getUnreadCount = async () => {
  const { data } = await api.get("/api/notifications/unread-count");
  return data; // { count: number }
};

export const fetchNotifications = async () => {
  const { data } = await api.get(`/notifications`);
  return data; // { data: [], pagination: {} }
};

export const markAsRead = async (id) => {
  const { data } = await api.put(`/notifications/${id}/read`);
  return data;
};

export const markAllAsRead = async () => {
  const { data } = await api.put("/api/notifications/read-all");
  return data;
};
