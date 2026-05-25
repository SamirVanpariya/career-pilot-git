import Grid from "@mui/material/Grid";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import AnalysisHead from "@/components/AnalysisHead";
import ATSScore from "@/components/ATSScore";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import AISuggestions from "@/components/AISuggestions";
import SkillGap from "@/components/SkillGap";

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

const overallScore = 74;

export default function ResumeAnalysisPage() {
  return (
    <div className="animate-fade-in-up">
      <AnalysisHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]">
        <Grid container spacing={3}>
          <ATSScore overallScore={overallScore} />
          <ScoreBreakdown scoreSections={scoreSections} />
        </Grid>
        <Grid container spacing={3}>
          <AISuggestions suggestions={suggestions} />
          <SkillGap skillGap={skillGap} />
        </Grid>
      </div>
    </div>
  );
}
