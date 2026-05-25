import Grid from "@mui/material/Grid";
import { Video, Calendar, Clock, CheckCircle, XCircle, Star, Mic, BookOpen, TrendingUp, ChevronRight, Play, Users, Award } from "lucide-react";
import CardWrp from "@/components/CardWrp";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

const summaryStats = [
  { label: "Total Interviews", value: "12", icon: Video,       color: "text-orange-400",  bg: "bg-orange-500/10"  },
  { label: "Upcoming",         value: "3",  icon: Calendar,    color: "text-orange-300",  bg: "bg-orange-400/10"  },
  { label: "Completed",        value: "8",  icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Avg. Score",       value: "82%",icon: Award,       color: "text-amber-400",   bg: "bg-amber-500/10"   },
];

const upcoming = [
  { company: "Stripe", role: "Senior Frontend Engineer", type: "Technical",    date: "Tomorrow", time: "10:00 AM", interviewer: "Sarah Chen", round: "Round 2", typeColor: "text-orange-400",  typeBg: "bg-orange-400/10"  },
  { company: "Vercel", role: "Staff Engineer",           type: "System Design",date: "Jun 20",   time: "2:00 PM",  interviewer: "Mark Liu",   round: "Round 3", typeColor: "text-orange-300",  typeBg: "bg-orange-300/10"  },
  { company: "Notion", role: "Software Engineer",        type: "Behavioural",  date: "Jun 23",   time: "11:30 AM", interviewer: "Priya Nair", round: "Round 1", typeColor: "text-amber-400",   typeBg: "bg-amber-400/10"   },
];

const past = [
  { company: "Linear",   role: "Product Engineer",   type: "Technical",    date: "Jun 10", outcome: "Passed",  score: 88, outcomeColor: "text-emerald-400", outcomeBg: "bg-emerald-400/10" },
  { company: "Figma",    role: "Frontend Developer", type: "System Design",date: "Jun 5",  outcome: "Rejected",score: 61, outcomeColor: "text-red-400",     outcomeBg: "bg-red-400/10"     },
  { company: "Loom",     role: "React Developer",    type: "Behavioural",  date: "May 30", outcome: "Passed",  score: 91, outcomeColor: "text-emerald-400", outcomeBg: "bg-emerald-400/10" },
  { company: "Intercom", role: "UI Engineer",        type: "Technical",    date: "May 22", outcome: "Pending", score: 75, outcomeColor: "text-amber-400",   outcomeBg: "bg-amber-400/10"   },
];

const prepResources = [
  { title: "System Design Fundamentals",    category: "System Design", duration: "45 min", difficulty: "Advanced",     icon: TrendingUp, color: "text-orange-400",  bg: "bg-orange-500/10",  diffColor: "text-red-400",     diffBg: "bg-red-400/10"     },
  { title: "Behavioural Interview Mastery", category: "Soft Skills",   duration: "30 min", difficulty: "Beginner",     icon: Mic,        color: "text-orange-300",  bg: "bg-orange-400/10",  diffColor: "text-emerald-400", diffBg: "bg-emerald-400/10" },
  { title: "React Deep Dive Q&A",           category: "Technical",     duration: "60 min", difficulty: "Intermediate", icon: BookOpen,   color: "text-amber-400",   bg: "bg-amber-500/10",   diffColor: "text-amber-400",   diffBg: "bg-amber-400/10"   },
  { title: "Mock Interview: Live Coding",   category: "Practice",      duration: "90 min", difficulty: "Advanced",     icon: Play,       color: "text-orange-200",  bg: "bg-orange-300/10",  diffColor: "text-red-400",     diffBg: "bg-red-400/10"     },
];

export default function InterviewsPage() {
  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Interviews</h1>
          <p className="text-zinc-500 text-sm mt-1">Track, prepare, and ace every interview.</p>
        </div>
        <PrimaryButton href="#"><Calendar className="w-4 h-4" /> Schedule Interview</PrimaryButton>
      </div>

      <Grid container spacing={2}>
        {summaryStats.map((s) => {
          const Icon = s.icon;
          return (
            <Grid key={s.label} size={{ xs: 6, md: 3 }}>
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-white text-xl font-black">{s.value}</p>
                  <p className="text-zinc-500 text-xs">{s.label}</p>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3} className="mt-0">
        <Grid size={{ xs: 12, lg: 6 }}>
          <CardWrp className="mt-0 h-full">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,87,34,0.12)" }}>
                <Calendar className="w-4 h-4" style={{ color: "var(--color-orange)" }} />
              </div>
              <h2 className="text-lg font-bold text-white">Upcoming</h2>
              <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ color: "var(--color-orange)", background: "rgba(255,87,34,0.10)" }}>
                {upcoming.length}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {upcoming.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-orange-500/20 transition-all group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <span className="text-white text-sm font-black">{item.company[0]}</span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{item.company}</p>
                        <p className="text-zinc-500 text-xs mt-0.5 truncate max-w-[160px]">{item.role}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${item.typeBg} ${item.typeColor}`}>{item.type}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.time}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{item.interviewer}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-zinc-600 text-xs">{item.round}</span>
                    <button className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
                      style={{ color: "var(--color-orange)" }}>
                      Prep now <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardWrp>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <CardWrp className="mt-0 h-full">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,87,34,0.12)" }}>
                <CheckCircle className="w-4 h-4" style={{ color: "var(--color-orange)" }} />
              </div>
              <h2 className="text-lg font-bold text-white">Past Interviews</h2>
            </div>
            <div className="flex flex-col gap-3">
              {past.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-black">{item.company[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{item.company}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{item.date} · {item.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.outcomeBg} ${item.outcomeColor}`}>{item.outcome}</span>
                    <p className="text-zinc-600 text-xs mt-1">Score: {item.score}%</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-zinc-400 text-sm font-medium">Average Interview Score</p>
                <span className="text-white font-black text-lg">82%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5">
                <div className="progress-bar" style={{ width: "82%" }} />
              </div>
              <p className="text-zinc-600 text-xs mt-2">Top 18% of candidates on this platform</p>
            </div>
          </CardWrp>
        </Grid>
      </Grid>

      <CardWrp>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,87,34,0.12)" }}>
            <BookOpen className="w-4 h-4" style={{ color: "var(--color-orange)" }} />
          </div>
          <h2 className="text-lg font-bold text-white">Interview Prep Resources</h2>
        </div>
        <Grid container spacing={3}>
          {prepResources.map((res) => {
            const Icon = res.icon;
            return (
              <Grid key={res.title} size={{ xs: 12, sm: 6, xl: 3 }}>
                <div className="glass-card rounded-xl p-5 flex flex-col gap-4 hover:border-orange-500/30 hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl ${res.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${res.color}`} />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${res.diffBg} ${res.diffColor}`}>{res.difficulty}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-snug">{res.title}</p>
                    <p className="text-zinc-500 text-xs mt-1">{res.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1 text-zinc-500 text-xs">
                      <Clock className="w-3 h-3" />{res.duration}
                    </span>
                    <button className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80 group-hover:gap-2"
                      style={{ color: "var(--color-orange)" }}>
                      Start <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </CardWrp>

      <CardWrp>
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(255,87,34,0.12)" }} />
          <div className="absolute bottom-[-40px] left-[-40px] w-[180px] h-[180px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(255,112,67,0.08)" }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-2">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 pulse-glow"
                style={{ background: "linear-gradient(135deg, rgba(255,87,34,0.25), rgba(255,112,67,0.15))", borderColor: "rgba(255,87,34,0.25)" }}>
                <Mic className="w-7 h-7" style={{ color: "var(--color-orange)" }} />
              </div>
              <div>
                <h3 className="text-white font-black text-lg">AI Mock Interview</h3>
                <p className="text-zinc-500 text-sm mt-0.5">Practice with our AI interviewer and get instant feedback on your answers.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <SecondaryButton href="#">View History</SecondaryButton>
              <PrimaryButton href="#"><Play className="w-4 h-4" /> Start Session</PrimaryButton>
            </div>
          </div>
        </div>
      </CardWrp>
    </div>
  );
}
