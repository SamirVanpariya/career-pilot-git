import React, { useState, useRef } from "react";
import { Grid } from "@mui/material";
import { Upload, File, X, CheckCircle } from "lucide-react";
import CommonModal from "./common/modal/CommonModal";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import Input from "./atoms/input/Input";
import Select from "./atoms/select/Select";
import Textarea from "./atoms/textarea/Textarea";

const EXPERIENCE_LEVELS = [
  "Entry Level (0-2 years)",
  "Mid Level (3-5 years)",
  "Senior Level (5-8 years)",
  "Expert (8+ years)",
];

const MAX_FILE_SIZE_MB = 5;

const ResumeUploadModal = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    linkedin: "",
    portfolio: "",
    notes: "",
  });

  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setError("");
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a resume file.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose(); // Close modal on success
      // Reset form
      setFile(null);
      setFormData({
        title: "",
        name: "",
        email: "",
        phone: "",
        skills: "",
        experience: "",
        linkedin: "",
        portfolio: "",
        notes: "",
      });
    }, 1500);
  };

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="Upload New Resume"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        {/* Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Resume File *
          </label>

          {!file ? (
            <div
              className={`relative border-2 border-dashed rounded-[var(--radius-lg)] p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-500 hover:bg-[#1f1f1f]"
              } bg-[#111111]`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Upload Resume"
              />

              <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                <div className="p-3 bg-[#1a1a1a] border border-gray-700 rounded-full text-gray-400">
                  <Upload className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Click to upload or drag and drop
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    PDF, DOC, or DOCX (max. 5MB)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-[#111111] border border-gray-700 rounded-[var(--radius-lg)]">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                  <File className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-xs">
                    {file.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
              <X className="w-3 h-3" /> {error}
            </p>
          )}
        </div>

        {/* Form Fields using MUI Grid */}
        <Grid container spacing={3} className="max-h-[300px] overflow-y-scroll">
          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Resume Title *
            </label>

            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Frontend Developer - 2026"
              required
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Candidate Name *
            </label>

            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
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
              placeholder="john@example.com"
              required
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Phone Number
            </label>

            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Experience Level
            </label>
            <Select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              options={EXPERIENCE_LEVELS}
              placeholder="Select level"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Skills (comma separated)
            </label>

            <Input
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="React, TypeScript, Next.js, Node.js"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              LinkedIn URL
            </label>

            <Input
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/username"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Portfolio URL
            </label>

            <Input
              name="portfolio"
              type="url"
              value={formData.portfolio}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Additional Notes
            </label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any specific instructions or focus areas for the analysis..."
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

          <PrimaryButton
            type="submit"
            loading={isSubmitting}
            disabled={
              !file || !formData.title || !formData.name || !formData.email
            }
          >
            {isSubmitting ? (
              "Uploading..."
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Submit Resume
              </>
            )}
          </PrimaryButton>
        </div>
      </form>
    </CommonModal>
  );
};

export default ResumeUploadModal;
