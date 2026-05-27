import {
  FileText,
  Briefcase,
  BarChart2,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

import DashboardBanner from "@/components/DashboardBanner";
import StatsCards from "@/components/StatsCards";
import CardWrp from "@/components/CardWrp";
import QuickActions from "@/components/QuickActions";
import ActivityInsights from "@/components/ActivityInsights";
import ResumeHistory from "@/components/ResumeHistory";
import CareerScore from "@/components/CareerScore";

/* ─── Quick Action Cards ─────────────────────────────────────── */
const quickActions = [
  {
    label: "Resume Analysis",
    description: "AI-powered resume scoring",
    href: "/resume-analysis",
    icon: FileText,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
  },
  {
    label: "Job Tracker",
    description: "Track your applications",
    href: "/job-tracker",
    icon: Briefcase,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
    border: "hover:border-orange-400/40",
  },
  {
    label: "Analytics",
    description: "Career performance insights",
    href: "/analytics",
    icon: BarChart2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    label: "Interviews",
    description: "Prep & schedule sessions",
    href: "/interviews",
    icon: MessageSquare,
    color: "text-orange-200",
    bg: "bg-orange-300/10",
    border: "hover:border-orange-300/40",
  },
];

/* ─── Recent Activity ────────────────────────────────────────── */
const recentActivity = [
  {
    type: "applied",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    time: "2h ago",
    status: "pending",
    icon: Clock,
    statusColor: "text-amber-400",
    statusBg: "bg-amber-400/10",
  },
  {
    type: "interview",
    company: "Vercel",
    role: "Staff Engineer",
    time: "Yesterday",
    status: "scheduled",
    icon: CheckCircle,
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-400/10",
  },
  {
    type: "applied",
    company: "Linear",
    role: "Product Engineer",
    time: "3 days ago",
    status: "reviewed",
    icon: Star,
    statusColor: "text-orange-400",
    statusBg: "bg-orange-400/10",
  },
  {
    type: "applied",
    company: "Figma",
    role: "Frontend Developer",
    time: "5 days ago",
    status: "pending",
    icon: Clock,
    statusColor: "text-amber-400",
    statusBg: "bg-amber-400/10",
  },
];

/* ─── AI Insights ────────────────────────────────────────────── */
const aiInsights = [
  {
    title: "Add quantified achievements",
    detail: "Resumes with metrics get 40% more callbacks.",
    priority: "High",
    priorityColor: "text-red-400",
    priorityBg: "bg-red-400/10",
  },
  {
    title: "Include TypeScript in skills",
    detail: "87% of matched roles require TypeScript.",
    priority: "Medium",
    priorityColor: "text-amber-400",
    priorityBg: "bg-amber-400/10",
  },
  {
    title: "Tailor summary per application",
    detail: "Personalised summaries improve ATS pass rate by 32%.",
    priority: "Medium",
    priorityColor: "text-amber-400",
    priorityBg: "bg-amber-400/10",
  },
];

/* ─── Career Score Progress ──────────────────────────────────── */
const scoreBreakdown = [
  { label: "Resume Quality", score: 85 },
  { label: "Keyword Match", score: 72 },
  { label: "Profile Completeness", score: 91 },
  { label: "Application Velocity", score: 60 },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="animate-fade-in-up flex flex-col gap-[20px] md:gap-[30px]">
      {/* Hero Banner */}
      <DashboardBanner />

      {/* Stats Row */}
      <CardWrp>
        <StatsCards />
      </CardWrp>

      {/* Quick Actions */}
      <CardWrp>
        <QuickActions data={quickActions} />
      </CardWrp>

      {/* Activity + Insights row */}
      <ActivityInsights
        recentActivity={recentActivity}
        aiInsights={aiInsights}
      />

      {/* Resume History List */}
      <ResumeHistory />

      {/* Career Score Breakdown */}
      <CardWrp>
        <CareerScore scoreBreakdown={scoreBreakdown} />
      </CardWrp>
    </div>
  );
}
