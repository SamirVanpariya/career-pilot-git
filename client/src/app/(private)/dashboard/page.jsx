import Link from "next/link";
import Grid from "@mui/material/Grid";
import {
  FileText,
  Briefcase,
  BarChart2,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react";

import DashboardBanner from "@/components/DashboardBanner";
import StatsCards from "@/components/StatsCards";
import CardWrp from "@/components/CardWrp";

/* ─── Quick Action Cards ─────────────────────────────────────── */
const quickActions = [
  {
    label: "Resume Analysis",
    description: "AI-powered resume scoring",
    href: "/resume-analysis",
    icon: FileText,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
  },
  {
    label: "Job Tracker",
    description: "Track your applications",
    href: "/job-tracker",
    icon: Briefcase,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    label: "Analytics",
    description: "Career performance insights",
    href: "/analytics",
    icon: BarChart2,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/40",
  },
  {
    label: "Interviews",
    description: "Prep & schedule sessions",
    href: "/interviews",
    icon: MessageSquare,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "hover:border-fuchsia-500/40",
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
    statusColor: "text-indigo-400",
    statusBg: "bg-indigo-400/10",
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
    <div className="animate-fade-in-up">
      {/* Hero Banner */}
      <DashboardBanner />

      {/* Stats Row */}
      <CardWrp>
        <StatsCards />
      </CardWrp>

      {/* Quick Actions */}
      <CardWrp>
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <Grid container spacing={2}>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Grid key={action.label} size={{ xs: 12, sm: 6, xl: 3 }}>
                <Link
                  href={action.href}
                  className={`glass-card rounded-xl p-4 flex items-center gap-4 group transition-all duration-300 border border-transparent ${action.border} hover:translate-y-[-2px]`}
                >
                  <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{action.label}</p>
                    <p className="text-zinc-500 text-xs mt-0.5 truncate">{action.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto shrink-0" />
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </CardWrp>

      {/* Activity + Insights row */}
      <Grid container spacing={3} className="mt-0">
        {/* Recent Activity */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <CardWrp className="mt-0 h-full">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Recent Activity</h2>
              <Link
                href="/job-tracker"
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {recentActivity.map((item, idx) => {
                const StatusIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/5"
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.statusBg} flex items-center justify-center shrink-0`}>
                      <StatusIcon className={`w-4 h-4 ${item.statusColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{item.role}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{item.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.statusBg} ${item.statusColor} capitalize`}>
                        {item.status}
                      </span>
                      <p className="text-zinc-600 text-xs mt-1">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardWrp>
        </Grid>

        {/* AI Insights */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <CardWrp className="mt-0 h-full">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-violet-500/15 flex items-center justify-center">
                <Zap className="w-4 h-4 text-violet-400" />
              </div>
              <h2 className="text-lg font-bold text-white">AI Insights</h2>
            </div>

            <div className="flex flex-col gap-3">
              {aiInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-violet-500/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-white text-sm font-semibold leading-snug">{insight.title}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${insight.priorityBg} ${insight.priorityColor}`}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed">{insight.detail}</p>
                </div>
              ))}
            </div>
          </CardWrp>
        </Grid>
      </Grid>

      {/* Career Score Breakdown */}
      <CardWrp>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <h2 className="text-lg font-bold text-white">Career Score Breakdown</h2>
        </div>

        <Grid container spacing={3}>
          {scoreBreakdown.map((item) => (
            <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">{item.label}</span>
                  <span className="text-white text-sm font-bold">{item.score}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5">
                  <div
                    className="progress-bar"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardWrp>
    </div>
  );
}
