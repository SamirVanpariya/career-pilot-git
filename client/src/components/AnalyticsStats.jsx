import { Grid } from "@mui/material";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const AnalyticsStats = ({ kpis }) => {
  return (
    <Grid container spacing={3}>
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight;
        const trendColor =
          kpi.trend === "up" ? "text-emerald-400" : "text-red-400";
        return (
          <Grid key={kpi.label} size={{ xs: 12, sm: 6, xl: 3 }}>
            <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:border-orange-500/25">
              <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-sm font-medium">{kpi.label}</p>
                <div
                  className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-white">{kpi.value}</h3>
              <div
                className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}
              >
                <TrendIcon className="w-3.5 h-3.5" />
                <span>{kpi.change} vs last month</span>
              </div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AnalyticsStats;
