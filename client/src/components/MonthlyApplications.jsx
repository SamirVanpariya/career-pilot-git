import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import TopCompanies from "./TopCompanies";

const MonthlyApplications = ({ topCompanies, monthlyData, maxApps }) => {
  return (
    <Grid container spacing={3} className="mt-0">
      <Grid size={{ xs: 12, lg: 7 }}>
        <CardWrp className="mt-0">
          <h2 className="text-lg font-bold text-white mb-6">
            Monthly Applications vs Interviews
          </h2>
          <div className="flex items-end gap-2 h-48">
            {monthlyData.map((d) => (
              <div
                key={d.month}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div className="w-full flex items-end gap-0.5 h-40">
                  <div
                    className="flex-1 rounded-t-md transition-all duration-700"
                    style={{
                      height: `${(d.apps / maxApps) * 100}%`,
                      background: "linear-gradient(to top, #E64A19, #FF7043)",
                    }}
                  />
                  <div
                    className="flex-1 rounded-t-md transition-all duration-700"
                    style={{
                      height: `${(d.interviews / maxApps) * 100}%`,
                      background: "linear-gradient(to top, #FF8A65, #FFAB91)",
                    }}
                  />
                </div>
                <span className="text-zinc-600 text-[10px]">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: "#FF7043" }}
              />
              <span className="text-zinc-400 text-xs">Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: "#FFAB91" }}
              />
              <span className="text-zinc-400 text-xs">Interviews</span>
            </div>
          </div>
        </CardWrp>
      </Grid>
      <TopCompanies topCompanies={topCompanies} />
    </Grid>
  );
};

export default MonthlyApplications;
