"use client";
import Grid from "@mui/material/Grid";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import AnalysisHead from "@/components/AnalysisHead";
import ATSScore from "@/components/ATSScore";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import AISuggestions from "@/components/AISuggestions";
import SkillGap from "@/components/SkillGap";
import ResumeHistory from "@/components/ResumeHistory";
import { getResumeByIdAPI } from "@/services/resumeService";
import LoadingWrpNew from "./common/LoadingWrpNew";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import StrengthList from "./StrengthList";
import WeaknessList from "./WeaknessList";
import MissingKeyword from "./MissingKeyword";
import TopCompany from "./TopCompany";

const scoreSections = [
  { label: "Formatting & Structure", score: 90, status: "good" },
  { label: "Keyword Optimisation", score: 72, status: "warning" },
  { label: "Quantified Achievements", score: 55, status: "warning" },
  { label: "Action Verbs", score: 88, status: "good" },
  { label: "Contact Information", score: 100, status: "good" },
  { label: "Skills Section", score: 40, status: "error" },
];

const suggestions = [
  {
    type: "error",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    title: "Missing skills section",
    detail:
      "Add a dedicated skills section listing your top 8–12 technical skills.",
  },
  {
    type: "warning",
    icon: AlertCircle,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    title: "Low keyword density",
    detail:
      "Include role-specific keywords like TypeScript, CI/CD, and system design.",
  },
  {
    type: "warning",
    icon: AlertCircle,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    title: "Achievements lack metrics",
    detail:
      "Quantify impact — e.g. 'Reduced load time by 40%' instead of 'Improved performance'.",
  },
  {
    type: "good",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    title: "Strong formatting",
    detail: "Your resume uses consistent fonts, spacing, and section headers.",
  },
];

const skillGap = [
  { skill: "TypeScript", have: true },
  { skill: "System Design", have: false },
  { skill: "CI/CD Pipelines", have: false },
  { skill: "React", have: true },
  { skill: "GraphQL", have: false },
  { skill: "Docker", have: true },
  { skill: "AWS", have: false },
  { skill: "Testing (Jest)", have: true },
];

export default function ResumeATSComp({ resumeId }) {
  const {
    data: resumeData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["resume", resumeId],
    queryFn: () => getResumeByIdAPI(resumeId),
    onSuccess: (data) => {
      toast.success("Resume loaded successfully:", data);
    },
    onError: (error) => {
      toast.error("Failed to load resume:", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <LoadingWrpNew />;
  if (isError) return <p>Error: {error?.message}</p>;

  console.log("Resume data by ID", resumeData);

  return (
    <div className="animate-fade-in-up">
      <Link
        href="/resume-analysis"
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Resume Analysis</span>
      </Link>
      <div className="flex overflow-hidden flex-col gap-[20px] md:gap-[30px]">
        <div className="w-full mx-auto overflow-hidden">
          <div
            className="rounded-2xl border border-zinc-800 p-8 py-12  overflow-hidden shadow-2xl"
            style={{
              backgroundImage: "url(/images/resume-analiser-person.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(0,0,0,0.6)",
              backgroundBlendMode: "overlay",
            }}
          >
            <div className="flex flex-col  gap-4">
              {/* Resume Title */}
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-3 border border-blue-500/20">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>

                <h1 className="text-[18px] md:text-2xl font-bold text-white tracking-tight">
                  {resumeData?.name}'s Resume Analysis
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-zinc-400 ">
                AI-powered insights, resume scoring, strengths, weaknesses, and
                recommendations for improvement.
              </p>

              {/* Resume Link */}
              <Link
                href={resumeData?.file || "#"}
                target="_blank"
                className="w-fit group inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-blue-400 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/20 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <FileText className="h-5 w-5" />
                <span className="font-medium">View Resume PDF</span>
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
        <Grid container spacing={3}>
          <ATSScore resumeData={resumeData} />
          {/* <ScoreBreakdown scoreSections={scoreSections} /> */}
          <MissingKeyword resumeData={resumeData} />
          <StrengthList resumeData={resumeData} />
          <WeaknessList resumeData={resumeData} />
        </Grid>
        <Grid container spacing={3}>
          <AISuggestions resumeData={resumeData} />
          {/* <SkillGap skillGap={skillGap} /> */}
          <TopCompany resumeData={resumeData} />
        </Grid>
      </div>
    </div>
  );
}
