"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  DollarSign,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle,
  Sparkles,
  Bookmark,
  Building,
  CheckSquare,
  AlertCircle,
  Clock1,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getJobByIdAPI } from "@/services/jobService";
import LoadingWrpNew from "@/components/common/LoadingWrpNew";
import Back from "@/components/common/Back";

const JobDetailClient = ({ id }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const toggleChecklistItem = (itemId) => {
    setJob((prev) => ({
      ...prev,
      checklists: prev.checklists.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item,
      ),
    }));
  };

  const addChecklistItem = (label) => {
    if (!label.trim()) return;
    const newItem = {
      id: Date.now(),
      label,
      done: false,
    };
    setJob((prev) => ({
      ...prev,
      checklists: [...prev.checklists, newItem],
    }));
  };

  const priorityBadgeStyle = {
    high: "bg-red-500/10 border-red-500/30 text-red-400",
    medium: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    low: "bg-zinc-500/10 border-zinc-500/30 text-zinc-400",
  };
  const statusConfig = {
    applied: "bg-amber-400/10 border-amber-400/20 text-amber-400",
    interview: "bg-orange-400/10 border-orange-400/20 text-orange-400",
    offer: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
    rejected: "bg-red-400/10 border-red-400/20 text-red-400",
    screening: "bg-yellow-400/10 border-yellow-400/20 text-yellow-400",
    withdrawn: "bg-red-400/10 border-red-400/20 text-red-400",
    joined: "bg-green-400/10 border-green-400/20 text-green-400",
  };

  const {
    data: jobData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobByIdAPI(id),
  });
  if (isLoading) return <LoadingWrpNew />;
  if (isError)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-400">
          {error.message || "Error loading job details"}
        </p>
      </div>
    );
  const JOBS = jobData?.job;

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between pb-2">
        <Back text="Back to Kanban Board" />
      </div>

      {/* Main Glassmorphic Header Card */}
      <div className="glass-card relative rounded-2xl p-6 md:p-8 overflow-hidden ">
        {/* Glow backdrop decorator */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start  gap-4">
            <div className="absolute md:top-[90px] bottom-[-30px] right-8  tracking-tighter font-[900]  md:text-[7rem] text-[4rem] leading-[110%] scale-[1.7] opacity-[0.1] shrink-0">
              {JOBS?.companyName}
            </div>
            <div>
              <div className="flex flex-wrap flex-col  gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {JOBS?.companyName}
                </h1>
                <span className="text-sm text-zinc-400 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {JOBS?.location}
                </span>
              </div>
              <p className="text-zinc-300 text-lg font-medium mt-1">
                {JOBS?.role}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="badge badge-primary font-semibold text-xs tracking-wide">
                  {JOBS?.jobType}
                </span>
                <span
                  className={`badge border text-xs font-semibold ${priorityBadgeStyle[JOBS.priority]}`}
                >
                  {JOBS?.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4 md:pt-0 md:border-0 shrink-0">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Application Status
              </label>
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border mb-2 ${statusConfig[JOBS?.status]} font-bold text-sm`}
              >
                <Clock1 className="w-4 h-4 shrink-0" />
                <span>{JOBS?.status.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Secondary Metadata Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            Salary
          </span>
          <span className="text-white text-base md:text-[16px]  mt-1 truncate">
            Offered : {JOBS?.offeredSalary || "Not Specified"}
          </span>
          <span className="text-white text-base md:text-[16px]  mt-1 truncate">
            Expected : {JOBS?.expectedSalary || "Not Specified"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            Application Date
          </span>
          <span className="text-white text-base md:text-lg font-bold mt-2 truncate">
            {JOBS?.applicationDate
              ? JOBS?.applicationDate.slice(0, 10).toUpperCase()
              : "Not Tracked"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            Platform Source
          </span>
          <span className="text-white text-base md:text-lg font-bold mt-2 truncate">
            {JOBS?.platform || "Direct"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            Contact Email (Recruiter's)
          </span>
          <Link
            href={JOBS?.recruiterEmail ? `mailto:${JOBS?.recruiterEmail}` : "#"}
            className="text-orange-400 hover:text-orange-300 text-sm md:text-base font-bold mt-2 truncate underline decoration-orange-500/30"
          >
            {JOBS?.recruiterEmail || "No Email Provided"}
          </Link>
        </div>
      </div>

      {/* Main Tabbed Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column - 2/3 Width: Interactive Tabs & Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom Tabs Navigation */}
          <div className="flex border-b border-white/5 bg-black/20 p-1.5 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`bg-[var(--color-card)] flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600 text-white shadow-md glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Job Profile
            </button>
            <button
              onClick={() => setActiveTab("checklist")}
              className={`bg-[var(--color-card)] flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === "checklist"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600 text-white shadow-md glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Notes & Checklist
            </button>
            <button
              onClick={() => setActiveTab("prep")}
              className={`bg-[var(--color-card)] flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === "prep"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600 text-white shadow-md glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Interview Prep Guide
            </button>
          </div>

          {/* TAB CONTENT: PROFILE */}
          {activeTab === "profile" && (
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-500" />
                  Job Description
                </h3>
                <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-black/20 p-4 rounded-xl border border-white/5">
                  {JOBS?.jobDescription || "No job description added yet."}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-gradient-bg-card">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-sky-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Original Posting URL
                    </h4>
                    <p className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-md">
                      {JOBS?.jobUrl}
                    </p>
                  </div>
                </div>
                <Link
                  href={JOBS?.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <span>Visit Link</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-gradient-bg-card">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-sky-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Company Website
                    </h4>
                    <p className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-md">
                      {JOBS?.companyWebsite}
                    </p>
                  </div>
                </div>
                <Link
                  href={JOBS?.companyWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CHECKLIST & NOTES */}
          {activeTab === "checklist" && (
            <div className="space-y-6">
              {/* Detailed Notes Editor */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-orange-500" />
                    Application Notes
                  </h3>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 min-h-[80px]">
                  {JOBS?.note || "No notes added yet."}
                </div>
              </div>

              {/* Milestones / Checklist */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-orange-500" />
                  Application Checklist & Milestones (static --- TODO)
                </h3>

                <div className="space-y-2.5">
                  {JOBS?.checklists && JOBS.checklists.length > 0 ? (
                    JOBS.checklists.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-black/10 cursor-pointer hover:border-orange-500/25 transition-all duration-200 ${
                          item.done ? "opacity-60" : ""
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            item.done
                              ? "bg-emerald-500 border-emerald-600 text-white"
                              : "border-white/20 text-transparent"
                          }`}
                        >
                          <svg
                            className="w-3 h-3 stroke-[3]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span
                          className={`text-sm text-zinc-300 font-medium ${
                            item.done ? "line-through text-zinc-500" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-500 text-sm italic">
                      No custom milestone items created.
                    </p>
                  )}
                </div>

                {/* Add Quick Checklist Item */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.target.elements.newItem;
                    addChecklistItem(input.value);
                    input.value = "";
                  }}
                  className="mt-4 flex gap-2"
                >
                  <input
                    name="newItem"
                    type="text"
                    placeholder="Add a new tracking milestone (e.g. Follow-up email sent)..."
                    className="flex-1 bg-black/35 border border-white/10 rounded-xl text-white px-3.5 py-2 text-xs focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-zinc-800 border border-white/5 text-white text-xs font-bold rounded-xl hover:bg-orange-500 hover:border-orange-600 transition-all duration-200 cursor-pointer shrink-0"
                  >
                    Add Item
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB CONTENT: AI INTERVIEW PREP */}
          {activeTab === "prep" && (
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-bold text-white">
                  AI-Tailored Interview Prep (TODO)
                </h3>
              </div>

              <div className="p-4 rounded-xl border border-orange-500/10 bg-orange-500/5 text-zinc-300 text-sm leading-relaxed flex gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block mb-0.5">
                    Automated Role Analysis
                  </span>
                  Based on the job title{" "}
                  <span className="text-orange-300 font-semibold">
                    {JOBS?.role}
                  </span>
                  , we suggest preparing details about:{" "}
                  <span className="font-bold text-zinc-200">
                    {JOBS?.interviewPrep?.focus ||
                      "Core system concepts, React APIs, and responsive design systems."}
                  </span>
                </div>
              </div>

              {JOBS?.interviewPrep?.questions &&
              JOBS.interviewPrep.questions.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-400">
                    Role-Specific Questions & Suggested Responses
                  </h4>

                  {JOBS.interviewPrep.questions.map((qItem, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-white/5 bg-black/20 space-y-2.5 hover:border-orange-500/10 transition-colors"
                    >
                      <div className="flex gap-2">
                        <span className="text-orange-400 font-extrabold text-sm shrink-0">
                          Q{index + 1}:
                        </span>
                        <h5 className="text-white font-bold text-sm leading-snug">
                          {qItem.q}
                        </h5>
                      </div>
                      <div className="flex gap-2 text-zinc-300 text-xs pl-5 border-l border-white/5 ml-2.5">
                        <div className="space-y-1">
                          <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[10px]">
                            Recommended Approach:
                          </span>
                          <p className="leading-relaxed text-zinc-400">
                            {qItem.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 italic text-sm">
                  No specific questions configured for this role template.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column - 1/3 Width: Quick Tips, Priorities & Progress Summary */}
        <div className="space-y-6">
          {/* Quick Tracking Checklist Progress */}
          <div className="glass-card rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Milestone Progress (TODO)
            </h4>

            {JOBS?.checklists && JOBS.checklists.length > 0 ? (
              <div className="space-y-2">
                {(() => {
                  const completed = JOBS.checklists.filter(
                    (item) => item.done,
                  ).length;
                  const total = JOBS.checklists.length;
                  const percentage =
                    total > 0 ? Math.round((completed / total) * 100) : 0;

                  return (
                    <>
                      <div className="flex justify-between text-xs font-semibold text-zinc-400">
                        <span>Stages Complete</span>
                        <span className="text-white font-extrabold">
                          {percentage}% ({completed}/{total})
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800/80 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="progress-bar"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <p className="text-zinc-500 text-xs italic">No stages tracked.</p>
            )}
          </div>

          {/* Pro tips banner */}
          <div className="glass-card rounded-xl p-5 border-l-2 border-l-orange-500 bg-gradient-bg-card space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Developer Pro-Tip (TODO)
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              When applying to roles, always follow up with direct hiring
              managers on LinkedIn or via email exactly 5 business days after
              submission. It boosts your call-back rate by 45%!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailClient;
