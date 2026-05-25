import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const TopCompanies = ({ topCompanies }) => {
  return (
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
                  <span className="text-white text-xs font-bold">
                    {co.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{co.name}</p>
                  <p className="text-zinc-500 text-xs">
                    {co.applied} application{co.applied > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${co.statusBg} ${co.statusColor}`}
              >
                {co.status}
              </span>
            </div>
          ))}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default TopCompanies;
