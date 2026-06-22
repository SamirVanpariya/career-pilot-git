import api from "@/lib/axios";

// POST
export const jobCreateAPI = async (jobData) => {
  const res = await api.post("/job", jobData);
  return res.data;
};

// GET
export const getJobsAPI = async () => {
  try {
    const res = await api.get("/job");
    return res.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// GET by ID
export const getJobByIdAPI = async (jobId) => {
  try {
    const res = await api.get(`/job/${jobId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
