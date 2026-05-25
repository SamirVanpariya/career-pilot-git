import Grid from "@mui/material/Grid";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Target,
  MessageSquare,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Applications",
    value: "42",
    sub: "+12% this week",
    trend: "up",
    icon: FileText,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    title: "ATS Score",
    value: "88",
    sub: "Out of 100",
    trend: "up",
    icon: Target,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    title: "Interview Rate",
    value: "15%",
    sub: "Top 10% globally",
    trend: "up",
    icon: MessageSquare,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Resume Health",
    value: "Strong",
    sub: "85% optimised",
    trend: "neutral",
    icon: Activity,
    color: "text-fuchsia-400",
    bgColor: "bg-fuchsia-500/10",
  },
];

export default function StatsCards() {
  return (
    <Grid container spacing={3}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor =
          stat.trend === "up"
            ? "text-emerald-400"
            : stat.trend === "down"
            ? "text-red-400"
            : "text-zinc-400";

        return (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <div className="glass-card rounded-2xl p-5 h-full flex flex-col gap-4 hover:border-[rgba(139,92,246,0.3)] transition-all duration-300 group">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-sm font-medium">{stat.title}</p>
                <div className={`w-9 h-9 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>

              {/* Value */}
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </h3>
              </div>

              {/* Trend */}
              <div className={`flex items-center gap-1.5 text-xs font-semibold ${trendColor}`}>
                {stat.trend !== "neutral" && (
                  <TrendIcon className="w-3.5 h-3.5" />
                )}
                <span>{stat.sub}</span>
              </div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}
