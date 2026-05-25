import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { DollarSign, MapPin } from "lucide-react";

const ApplicationBoard = ({ columns, jobs, priorityStyles }) => {
  return (
    <CardWrp>
      <h2 className="text-lg font-bold text-white mb-5">Application Board</h2>
      <Grid container spacing={3}>
        {columns.map((col) => {
          const ColIcon = col.icon;
          const colJobs = jobs.filter((j) => j.status === col.id);
          return (
            <Grid key={col.id} size={{ xs: 12, sm: 6, xl: 3 }}>
              <div className="flex flex-col gap-3">
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border ${col.border} ${col.bg}`}
                >
                  <div className="flex items-center gap-2">
                    <ColIcon className={`w-4 h-4 ${col.color}`} />
                    <span className={`text-sm font-bold ${col.color}`}>
                      {col.label}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full bg-black/20 ${col.color}`}
                  >
                    {colJobs.length}
                  </span>
                </div>

                <div className="flex flex-col gap-4 min-h-[120px]">
                  {colJobs.map((job) => {
                    const p = priorityStyles[job.priority];
                    return (
                      <div
                        key={job.id}
                        className="glass-card rounded-xl p-4 flex flex-col gap-3 hover:border-orange-500/25 hover:translate-y-[-1px] transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                              <span className="text-white text-xs font-bold">
                                {job.company[0]}
                              </span>
                            </div>
                            <span className="text-white text-sm font-bold truncate">
                              {job.company}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${p.bg} ${p.color}`}
                          >
                            {p.label}
                          </span>
                        </div>
                        <p className="text-zinc-300 text-xs leading-relaxed">
                          {job.role}
                        </p>
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
                        <div className="pt-2 border-t border-white/5">
                          <span className="text-zinc-600 text-xs">
                            Applied {job.date}
                          </span>
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
  );
};

export default ApplicationBoard;
