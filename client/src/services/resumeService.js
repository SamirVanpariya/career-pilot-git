import api from "@/lib/axios";

// POST
export const uploadResumeAPI = async (resumeData) => {
  const res = await api.post("/resume", resumeData);
  return res.data;
};

// GET
export const getResumesAPI = async () => {
  const res = await api.get("/resume");
  return res.data;
};

// DELETE
export const deleteResumeAPI = async (resumeId) => {
  const res = await api.delete(`/resume/${resumeId}`);
  return res.data;
};
