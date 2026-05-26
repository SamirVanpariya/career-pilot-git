import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { Calendar, ChevronRight, Clock, Users } from "lucide-react";

const UpcomingInterview = ({ upcoming }) => {
  return (
    <Grid size={{ xs: 12, lg: 6 }}>
      <CardWrp className="mt-0 h-full">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,87,34,0.12)" }}
          >
            <Calendar
              className="w-4 h-4"
              style={{ color: "var(--color-orange)" }}
            />
          </div>
          <h2 className="text-lg font-bold text-white">Upcoming</h2>
          <span
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              color: "var(--color-orange)",
              background: "rgba(255,87,34,0.10)",
            }}
          >
            {upcoming.length}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {upcoming.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-orange-500/20 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-black">
                      {item.company[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {item.company}
                    </p>
                    <p className="text-[var(--color-text-secondary)] text-xs mt-0.5 truncate max-w-[160px]">
                      {item.role}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${item.typeBg} ${item.typeColor}`}
                >
                  {item.type}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {item.interviewer}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-zinc-600 text-xs">{item.round}</span>
                <button
                  className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
                  style={{ color: "var(--color-orange)" }}
                >
                  Prep now <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default UpcomingInterview;
