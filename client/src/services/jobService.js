import api from "@/lib/axios";

// POST
export const jobCreateAPI = async (jobData) => {
  const res = await api.post("/job", jobData);
  return res.data;
};

// GET
export const getJobsAPI = async () => {
  const res = await api.get("/job");
  return res.data;
};
