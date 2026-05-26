import { Zap } from "lucide-react";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const AISuggestions = ({ suggestions }) => {
  return (
    <Grid size={{ xs: 12, lg: 7 }}>
      <CardWrp className="mt-0">
        <div className="flex items-center gap-2 mb-5">
          <Zap className="w-5 h-5" style={{ color: "var(--color-orange)" }} />
          <h2 className="text-lg font-bold text-white">AI Suggestions</h2>
        </div>
        <div className="flex flex-col gap-3">
          {suggestions.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className={`flex gap-3 p-4 rounded-xl border ${s.border} bg-white/[0.02]`}
              >
                <div
                  className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{s.title}</p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-1 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default AISuggestions;
