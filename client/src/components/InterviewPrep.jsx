import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { BookOpen, ChevronRight, Clock } from "lucide-react";

const InterviewPrep = ({ prepResources }) => {
  return (
    <CardWrp>
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(255,87,34,0.12)" }}
        >
          <BookOpen
            className="w-4 h-4"
            style={{ color: "var(--color-orange)" }}
          />
        </div>
        <h2 className="text-lg font-bold text-white">
          Interview Prep Resources
        </h2>
      </div>
      <Grid container spacing={3}>
        {prepResources.map((res) => {
          const Icon = res.icon;
          return (
            <Grid key={res.title} size={{ xs: 12, sm: 6, xl: 3 }}>
              <div className="glass-card rounded-xl p-5 flex flex-col gap-4 hover:border-orange-500/30 hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl ${res.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${res.color}`} />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${res.diffBg} ${res.diffColor}`}
                  >
                    {res.difficulty}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-snug">
                    {res.title}
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">{res.category}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="flex items-center gap-1 text-zinc-500 text-xs">
                    <Clock className="w-3 h-3" />
                    {res.duration}
                  </span>
                  <button
                    className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80 group-hover:gap-2"
                    style={{ color: "var(--color-orange)" }}
                  >
                    Start <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </CardWrp>
  );
};

export default InterviewPrep;
