import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { CheckCircle } from "lucide-react";

const PastInterviews = ({ past }) => {
  return (
    <Grid size={{ xs: 12, lg: 6 }}>
      <CardWrp className="mt-0 h-full">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,87,34,0.12)" }}
          >
            <CheckCircle
              className="w-4 h-4"
              style={{ color: "var(--color-orange)" }}
            />
          </div>
          <h2 className="text-lg font-bold text-white">Past Interviews</h2>
        </div>
        <div className="flex flex-col gap-3">
          {past.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-black">
                  {item.company[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  {item.company}
                </p>
                <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                  {item.date} · {item.type}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.outcomeBg} ${item.outcomeColor}`}
                >
                  {item.outcome}
                </span>
                <p className="text-zinc-600 text-xs mt-1">
                  Score: {item.score}%
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-zinc-400 text-sm font-medium">
              Average Interview Score
            </p>
            <span className="text-white font-black text-lg">82%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/5">
            <div className="progress-bar" style={{ width: "82%" }} />
          </div>
          <p className="text-zinc-600 text-xs mt-2">
            Top 18% of candidates on this platform
          </p>
        </div>
      </CardWrp>
    </Grid>
  );
};

export default PastInterviews;
