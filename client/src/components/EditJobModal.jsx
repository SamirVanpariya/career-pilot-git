import React, { useState } from "react";
import { Grid } from "@mui/material";
import { CheckCircle } from "lucide-react";
import CommonModal from "./common/modal/CommonModal";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import Input from "./atoms/input/Input";
import Select from "./atoms/select/Select";
import Textarea from "./atoms/textarea/Textarea";

const PLATFORM = ["LinkedIn", "Indeed", "Company website", "Other"];
const JOB_TYPE = ["Full-time", "Part-time", "Contract"];
const LOCATION = ["need to add locations API here"];
const ROLES = ["Front-end Developer", "need to add roles API here"];

const EditJobModal = ({ open, onClose, jobId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    salary: "",
    email: "",
    url: "",
    platform: "",
    description: "",
    roles: "",
    location: "",
    jobType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose(); // Close modal on success
      // Reset form
      setFormData({
        companyName: "",
        salary: "",
        email: "",
        url: "",
        platform: "",
        description: "",
        roles: "",
        location: "",
        jobType: "",
      });
    }, 1500);
  };

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="Edit Job"
      subTitle={`ID ${jobId} `}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <Grid container spacing={3} className="max-h-[300px] overflow-y-scroll">
          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Company Name *
            </label>

            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g. Frontend Developer - 2026"
              required
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              salary
            </label>

            <Input
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="100000"
              required
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email Address *
            </label>

            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tech@company.com"
              required
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              URL
            </label>

            <Input
              name="url"
              type="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://link"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Platform *
            </label>
            <Select
              name="platform"
              value={formData.platform}
              onChange={handleInputChange}
              options={PLATFORM}
              placeholder="Select Platform"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Job Type *
            </label>
            <Select
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              options={JOB_TYPE}
              placeholder="Select Job Type"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Location *
            </label>
            <Select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              options={LOCATION}
              placeholder="Select Location"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Roles *
            </label>
            <Select
              name="roles"
              value={formData.roles}
              onChange={handleInputChange}
              options={ROLES}
              placeholder="Select Roles"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Job description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Paste job description here..."
              className={`bg-[#111111] border-gray-700 text-white placeholder:text-gray-500`}
            />
          </Grid>
        </Grid>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700 mt-6"
          style={{ marginTop: "24px", paddingTop: "16px" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-5 h-[44px] rounded-[var(--radius-md)] text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1f1f1f] transition-colors focus:outline-none"
          >
            Cancel
          </button>

          <PrimaryButton type="submit" loading={isSubmitting}>
            {isSubmitting ? "Saving ..." : "Save"}
          </PrimaryButton>
        </div>
      </form>
    </CommonModal>
  );
};

export default EditJobModal;
