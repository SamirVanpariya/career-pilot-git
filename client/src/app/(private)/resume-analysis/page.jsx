import Grid from "@mui/material/Grid";
import { FileText, CheckCircle, AlertCircle, XCircle, Zap, Upload, TrendingUp } from "lucide-react";
import CardWrp from "@/components/CardWrp";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";

const scoreSections = [
  { label: "Formatting & Structure",    score: 90, status: "good"    },
  { label: "Keyword Optimisation",      score: 72, status: "warning" },
  { label: "Quantified Achievements",   score: 55, status: "warning" },
  { label: "Action Verbs",              score: 88, status: "good"    },
  { label: "Contact Information",       score: 100,status: "good"    },
  { label: "Skills Section",            score: 40, status: "error"   },
];

const suggestions = [
  { type: "error",   icon: XCircle,     color: "text-red-400",     bg: "bg-red-400/10",     border: "border-red-400/20",     title: "Missing skills section",      detail: "Add a dedicated skills section listing your top 8–12 technical skills." },
  { type: "warning", icon: AlertCircle, color: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/20",   title: "Low keyword density",         detail: "Include role-specific keywords like TypeScript, CI/CD, and system design." },
  { type: "warning", icon: AlertCircle, color: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/20",   title: "Achievements lack metrics",   detail: "Quantify impact — e.g. 'Reduced load time by 40%' instead of 'Improved performance'." },
  { type: "good",    icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", title: "Strong formatting",           detail: "Your resume uses consistent fonts, spacing, and section headers." },
];

const skillGap = [
  { skill: "TypeScript",    have: true  },
  { skill: "System Design", have: false },
  { skill: "CI/CD Pipelines",have: false},
  { skill: "React",         have: true  },
  { skill: "GraphQL",       have: false },
  { skill: "Docker",        have: true  },
  { skill: "AWS",           have: false },
  { skill: "Testing (Jest)",have: true  },
];

const overallScore = 74;

export default function ResumeAnalysisPage() {
  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Resume Analysis</h1>
          <p className="text-zinc-500 text-sm mt-1">AI-powered resume scoring and optimisation.</p>
        </div>
        <PrimaryButton href="#"><Upload className="w-4 h-4" /> Upload New Resume</PrimaryButton>
      </div>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-4 h-full">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,87,34,0.12)" }}>
              <FileText className="w-6 h-6" style={{ color: "var(--color-orange)" }} />
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Overall ATS Score</p>
              <div className="mt-3 relative w-36 h-36 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#1e1e30" strokeWidth="10" fill="none" />
                  <circle cx="60" cy="60" r="50" stroke="url(#scoreGrad)" strokeWidth="10" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallScore / 100)}`}
                    className="transition-all duration-700" />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFCCBC" />
                      <stop offset="100%" stopColor="#FF5722" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">{overallScore}</span>
                  <span className="text-xs text-zinc-500 tracking-widest">/ 100</span>
                </div>
              </div>
            </div>
            <div className="w-full pt-2 border-t border-white/5">
              <p className="text-zinc-400 text-xs">
                Your resume ranks in the{" "}
                <span className="font-bold" style={{ color: "var(--color-orange-light)" }}>top 26%</span> of candidates.
              </p>
            </div>
          </div>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <CardWrp className="!mt-0 h-full">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5" style={{ color: "var(--color-orange)" }} />
              <h2 className="text-lg font-bold text-white">Score Breakdown</h2>
            </div>
            <div className="flex flex-col gap-4">
              {scoreSections.map((s) => {
                const barColor = s.status === "good" ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                  : s.status === "warning" ? "bg-gradient-to-r from-amber-600 to-amber-400"
                  : "bg-gradient-to-r from-red-600 to-red-400";
                const textColor = s.status === "good" ? "text-emerald-400" : s.status === "warning" ? "text-amber-400" : "text-red-400";
                return (
                  <div key={s.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300 text-sm">{s.label}</span>
                      <span className={`text-sm font-bold ${textColor}`}>{s.score}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5">
                      <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardWrp>
        </Grid>
      </Grid>

      <Grid container spacing={3} className="mt-2">
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
                  <div key={idx} className={`flex gap-3 p-4 rounded-xl border ${s.border} bg-white/[0.02]`}>
                    <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{s.title}</p>
                      <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardWrp>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <CardWrp className="mt-0">
            <h2 className="text-lg font-bold text-white mb-5">Skill Gap Analysis</h2>
            <p className="text-zinc-500 text-xs mb-4">Based on top 50 matched job descriptions.</p>
            <div className="flex flex-col gap-2.5">
              {skillGap.map((item) => (
                <div key={item.skill} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <span className="text-zinc-300 text-sm">{item.skill}</span>
                  {item.have ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Present
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full">
                      <XCircle className="w-3 h-3" /> Missing
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardWrp>
        </Grid>
      </Grid>
    </div>
  );
}
