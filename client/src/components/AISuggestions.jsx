import { Sparkles, ArrowRight } from "lucide-react";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const AISuggestions = ({ resumeData = [] }) => {
  const suggestions = resumeData?.atsAnalysis?.suggestions || [];

  return (
    <Grid size={{ xs: 12, lg: 6 }}>
      <CardWrp className="!mt-0 h-full">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles
            className="w-7 h-7"
            style={{ color: "var(--color-orange)" }}
          />
          <h2 className="text-[20px] md:text-[22px] font-bold text-white">AI Recommendations</h2>
        </div>

        <div className="space-y-4">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-violet-500/20
                bg-gradient-to-r
                from-violet-500/10
                via-indigo-500/5
                to-cyan-500/10
                p-4
                transition-all
                duration-300
                hover:border-violet-400/50
                hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]
              "
            >
              {/* Glow Effect */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                  bg-gradient-to-r
                  from-violet-500/5
                  to-cyan-500/5
                "
              />

              <div className="relative flex items-center gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-violet-500
                    to-cyan-500
                    shadow-lg
                    shadow-violet-500/20
                    shrink-0
                  "
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </div>

                <div className="flex-1">
                  <p className="text-zinc-200 leading-relaxed md:text-[18px] text-[16px]">
                    {suggestion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default AISuggestions;
