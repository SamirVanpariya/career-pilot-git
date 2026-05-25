import Grid from "@mui/material/Grid";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Users,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import CardWrp from "@/components/CardWrp";

/* ─── KPI Cards ──────────────────────────────────────────────── */
const kpis = [
  {
    label: "Total Applications",
    value: "142",
    change: "+18%",
    trend: "up",
    icon: BarChart2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    label: "Response Rate",
    value: "23%",
    change: "+5%",
    trend: "up",
    icon: Users,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    label: "Interview Conversion",
    value: "15%",
    change: "-2%",
    trend: "down",
    icon: Target,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    label: "Offer Rate",
    value: "8%",
    change: "+3%",
    trend: "up",
    icon: Award,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
  },
];

/* ─── Monthly Application Data (visual bar chart) ────────────── */
const monthlyData = [
  { month: "Jan", apps: 8, interviews: 2 },
  { month: "Feb", apps: 12, interviews: 3 },
  { month: "Mar", apps: 18, interviews: 5 },
  { month: "Apr", apps: 14, interviews: 4 },
  { month: "May", apps: 22, interviews: 7 },
  { month: "Jun", apps: 28, interviews: 9 },
  { month: "Jul", apps: 20, interviews: 6 },
  { month: "Aug", apps: 32, interviews: 11 },
];

const maxApps = Math.max(...monthlyData.map((d) => d.apps));

/* ─── Top Companies ──────────────────────────────────────────── */
const topCompanies = [
  { name: "Stripe", applied: 3, status: "Interview", statusColor: "text-emerald-400", statusBg: "bg-emerald-400/10" },
  { name: "Vercel", applied: 2, status: "Offer", statusColor: "text-violet-400", statusBg: "bg-violet-400/10" },
  { name: "Linear", applied: 4, status: "Pending", statusColor: "text-amber-400", statusBg: "bg-amber-400/10" },
  { name: "Figma", applied: 2, status: "Rejected", statusColor: "text-red-400", statusBg: "bg-red-400/10" },
  { name: "Notion", applied: 1, status: "Interview", statusColor: "text-emerald-400", statusBg: "bg-emerald-400/10" },
];

/* ─── Skill Demand ───────────────────────────────────────────── */
const skillDemand = [
  { skill: "React", demand: 94 },
  { skill: "TypeScript", demand: 87 },
  { skill: "Node.js", demand: 76 },
  { skill: "Next.js", demand: 71 },
  { skill: "GraphQL", demand: 58 },
  { skill: "AWS", demand: 52 },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Analytics</h1>
        <p className="text-zinc-500 text-sm mt-1">Track your career performance and application trends.</p>
      </div>

      {/* KPI Row */}
      <Grid container spacing={3}>
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight;
          const trendColor = kpi.trend === "up" ? "text-emerald-400" : "text-red-400";
          return (
            <Grid key={kpi.label} size={{ xs: 12, sm: 6, xl: 3 }}>
              <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 hover:border-[rgba(139,92,246,0.25)] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-sm font-medium">{kpi.label}</p>
                  <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">{kpi.value}</h3>
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
                  <TrendIcon className="w-3.5 h-3.5" />
                  <span>{kpi.change} vs last month</span>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>

      {/* Bar Chart + Top Companies */}
      <Grid container spacing={3} className="mt-0">
        {/* Bar Chart */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <CardWrp className="mt-0">
            <h2 className="text-lg font-bold text-white mb-6">Monthly Applications vs Interviews</h2>
            <div className="flex items-end gap-2 h-48">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-0.5 h-40">
                    {/* Applications bar */}
                    <div
                      className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-700"
                      style={{ height: `${(d.apps / maxApps) * 100}%` }}
                    />
                    {/* Interviews bar */}
                    <div
                      className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600 to-violet-400 transition-all duration-700"
                      style={{ height: `${(d.interviews / maxApps) * 100}%` }}
                    />
                  </div>
                  <span className="text-zinc-600 text-[10px]">{d.month}</span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-5 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-indigo-400" />
                <span className="text-zinc-400 text-xs">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-violet-400" />
                <span className="text-zinc-400 text-xs">Interviews</span>
              </div>
            </div>
          </CardWrp>
        </Grid>

        {/* Top Companies */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <CardWrp className="mt-0">
            <h2 className="text-lg font-bold text-white mb-5">Top Companies</h2>
            <div className="flex flex-col gap-3">
              {topCompanies.map((co) => (
                <div
                  key={co.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{co.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{co.name}</p>
                      <p className="text-zinc-500 text-xs">{co.applied} application{co.applied > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${co.statusBg} ${co.statusColor}`}>
                    {co.status}
                  </span>
                </div>
              ))}
            </div>
          </CardWrp>
        </Grid>
      </Grid>

      {/* Skill Demand */}
      <CardWrp>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-violet-400" />
          <h2 className="text-lg font-bold text-white">In-Demand Skills for Your Profile</h2>
        </div>
        <Grid container spacing={3}>
          {skillDemand.map((item) => (
            <Grid key={item.skill} size={{ xs: 12, sm: 6, md: 4 }}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 text-sm font-medium">{item.skill}</span>
                  <span className="text-white text-sm font-bold">{item.demand}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5">
                  <div className="progress-bar" style={{ width: `${item.demand}%` }} />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardWrp>
    </div>
  );
}
