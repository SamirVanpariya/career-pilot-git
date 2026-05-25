import { Grid } from "@mui/material";
import { TrendingUp } from "lucide-react";

const CareerScore = ({ scoreBreakdown }) => {
  return (
    <div className="">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(255,87,34,0.12)" }}
        >
          <TrendingUp
            className="w-4 h-4"
            style={{ color: "var(--color-orange)" }}
          />
        </div>
        <h2 className="text-lg font-bold text-white">Career Score Breakdown</h2>
      </div>

      <Grid container spacing={3}>
        {scoreBreakdown.map((item) => (
          <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">{item.label}</span>
                <span className="text-white text-sm font-bold">
                  {item.score}%
                </span>
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
    </div>
  );
};

export default CareerScore;
