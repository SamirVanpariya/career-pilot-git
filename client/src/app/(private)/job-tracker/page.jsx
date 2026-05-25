import Grid from "@mui/material/Grid";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
  Plus,
  MapPin,
  DollarSign,
} from "lucide-react";
import CardWrp from "@/components/CardWrp";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";

/* ─── Board Columns ──────────────────────────────────────────── */
const columns = [
  {
    id: "applied",
    label: "Applied",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    count: 3,
  },
  {
    id: "interview",
    label: "Interview",
    icon: MessageSquare,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20",
    count: 2,
  },
  {
    id: "offer",
    label: "Offer",
    icon: Star,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    count: 1,
  },
  {
    id: "rejected",
    label: "Rejected",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    count: 2,
  },
];

/* ─── Jobs ───────────────────────────────────────────────────── */
const jobs = [
  {
    id: 1,
    company: "Stripe",
    role: "Senior Frontend Engineer",
    location: "Remote",
    salary: "$160k–$200k",
    status: "applied",
    date: "Jun 12",
    priority: "high",
  },
  {
    id: 2,
    company: "Vercel",
    role: "Staff Engineer",
    location: "San Francisco, CA",
    salary: "$180k–$220k",
    status: "interview",
    date: "Jun 10",
    priority: "high",
  },
  {
    id: 3,
    company: "Linear",
    role: "Product Engineer",
    location: "Remote",
    salary: "$140k–$170k",
    status: "applied",
    date: "Jun 8",
    priority: "medium",
  },
  {
    id: 4,
    company: "Figma",
    role: "Frontend Developer",
    location: "New York, NY",
    salary: "$130k–$160k",
    status: "rejected",
    date: "Jun 5",
    priority: "low",
  },
  {
    id: 5,
    company: "Notion",
    role: "Software Engineer",
    location: "Remote",
    salary: "$150k–$185k",
    status: "interview",
    date: "Jun 3",
    priority: "high",
  },
  {
    id: 6,
    company: "Loom",
    role: "React Developer",
    location: "Remote",
    salary: "$120k–$150k",
    status: "offer",
    date: "May 28",
    priority: "high",
  },
  {
    id: 7,
    company: "Intercom",
    role: "UI Engineer",
    location: "Dublin, IE",
    salary: "$110k–$140k",
    status: "rejected",
    date: "May 25",
    priority: "low",
  },
  {
    id: 8,
    company: "Planetscale",
    role: "Full Stack Engineer",
    location: "Remote",
    salary: "$145k–$175k",
    status: "applied",
    date: "May 22",
    priority: "medium",
  },
];

const priorityStyles = {
  high: { label: "High", color: "text-red-400", bg: "bg-red-400/10" },
  medium: { label: "Med", color: "text-amber-400", bg: "bg-amber-400/10" },
  low: { label: "Low", color: "text-zinc-400", bg: "bg-zinc-400/10" },
};

/* ─── Summary Stats ──────────────────────────────────────────── */
const summaryStats = [
  { label: "Total Tracked", value: "8", icon: Briefcase, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { label: "Active", value: "5", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Interviews", value: "2", icon: MessageSquare, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Offers", value: "1", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10" },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function JobTrackerPage() {
  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Job Tracker</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage and track all your job applications.</p>
        </div>
        <PrimaryButton href="#">
          <Plus className="w-4 h-4" />
          Add Application
        </PrimaryButton>
      </div>

      {/* Summary Stats */}
      <Grid container spacing={2} className="mb-2">
        {summaryStats.map((s) => {
          const Icon = s.icon;
          return (
            <Grid key={s.label} size={{ xs: 6, md: 3 }}>
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-white text-xl font-black">{s.value}</p>
                  <p className="text-zinc-500 text-xs">{s.label}</p>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>

      {/* Kanban Board */}
      <CardWrp>
        <h2 className="text-lg font-bold text-white mb-5">Application Board</h2>
        <Grid container spacing={3}>
          {columns.map((col) => {
            const ColIcon = col.icon;
            const colJobs = jobs.filter((j) => j.status === col.id);
            return (
              <Grid key={col.id} size={{ xs: 12, sm: 6, xl: 3 }}>
                <div className="flex flex-col gap-3">
                  {/* Column Header */}
                  <div className={`flex items-center justify-between px-3 py-2 rounded-xl border ${col.border} ${col.bg}`}>
                    <div className="flex items-center gap-2">
                      <ColIcon className={`w-4 h-4 ${col.color}`} />
                      <span className={`text-sm font-bold ${col.color}`}>{col.label}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-black/20 ${col.color}`}>
                      {colJobs.length}
                    </span>
                  </div>

                  {/* Job Cards */}
                  <div className="flex flex-col gap-2 min-h-[120px]">
                    {colJobs.map((job) => {
                      const p = priorityStyles[job.priority];
                      return (
                        <div
                          key={job.id}
                          className="glass-card rounded-xl p-4 flex flex-col gap-3 hover:border-[rgba(139,92,246,0.25)] hover:translate-y-[-1px] transition-all duration-200 cursor-pointer"
                        >
                          {/* Company + Priority */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                <span className="text-white text-xs font-bold">{job.company[0]}</span>
                              </div>
                              <span className="text-white text-sm font-bold truncate">{job.company}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${p.bg} ${p.color}`}>
                              {p.label}
                            </span>
                          </div>

                          {/* Role */}
                          <p className="text-zinc-300 text-xs leading-relaxed">{job.role}</p>

                          {/* Meta */}
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                              <DollarSign className="w-3 h-3 shrink-0" />
                              <span>{job.salary}</span>
                            </div>
                          </div>

                          {/* Date */}
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-zinc-600 text-xs">Applied {job.date}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </CardWrp>
    </div>
  );
}
