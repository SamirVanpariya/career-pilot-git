"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight, TrendingUp, Briefcase, Target, Sparkles, ChevronRight, Star } from "lucide-react";

function StatPill({ icon: Icon, label, value, color, bg }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${bg} border border-white/[0.06]`}>
      <div className={`w-6 h-6 rounded-lg ${bg} flex items-center justify-center`}>
        <Icon className={`w-3.5 h-3.5 ${color}`} />
      </div>
      <div>
        <p className={`text-xs font-black ${color} leading-none`}>{value}</p>
        <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 leading-none">{label}</p>
      </div>
    </div>
  );
}

function AnimatedNumber({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

function GaugeRing({ percentile }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.75;
  const offset = arc - (percentile / 100) * arc;

  return (
    <div className="relative w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] lg:w-[240px] lg:h-[240px]">
      <div className="absolute inset-0 rounded-full blur-xl" style={{ background: "rgba(255,87,34,0.06)" }} />
      <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gaugeTrack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e30" />
            <stop offset="100%" stopColor="#16162a" />
          </linearGradient>
          <linearGradient id="gaugeFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFCCBC" />
            <stop offset="50%" stopColor="#FF7043" />
            <stop offset="100%" stopColor="#FF5722" />
          </linearGradient>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="100" cy="100" r={radius} stroke="url(#gaugeTrack)" strokeWidth="14" fill="none"
          strokeLinecap="round" strokeDasharray={`${arc} ${circumference}`} />
        <circle cx="100" cy="100" r={radius} stroke="url(#gaugeFill)" strokeWidth="14" fill="none"
          strokeLinecap="round" strokeDasharray={`${arc} ${circumference}`} strokeDashoffset={offset}
          filter="url(#gaugeGlow)" className="transition-all duration-1000 ease-out" />
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = -135 + (tick / 100) * 270;
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + (radius - 20) * Math.cos(rad);
          const y1 = 100 + (radius - 20) * Math.sin(rad);
          const x2 = 100 + (radius - 14) * Math.cos(rad);
          const y2 = 100 + (radius - 14) * Math.sin(rad);
          return <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2a2a45" strokeWidth="2" strokeLinecap="round" />;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] lg:w-[148px] lg:h-[148px] rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none">
            <AnimatedNumber target={percentile} suffix="%" />
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.2em] font-bold mt-1.5 uppercase" style={{ color: "var(--color-orange)" }}>
            Percentile
          </span>
        </div>
      </div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
        <span className="text-[9px] text-zinc-600 font-semibold">0%</span>
      </div>
    </div>
  );
}

export default function DashboardBanner() {
  const [percentile] = useState(95);
  const [activeMatch, setActiveMatch] = useState(0);

  const matches = [
    { company: "Stripe", role: "Senior Frontend Engineer", match: 97, salary: "$180k" },
    { company: "Vercel", role: "Staff Engineer", match: 94, salary: "$200k" },
    { company: "Linear", role: "Product Engineer", match: 91, salary: "$165k" },
  ];

  const stats = [
    { icon: Briefcase, label: "Applications", value: "42",     color: "text-orange-400", bg: "bg-orange-500/10" },
    { icon: Target,    label: "ATS Score",    value: "88/100", color: "text-orange-300", bg: "bg-orange-400/10" },
    { icon: TrendingUp,label: "Interview Rate",value: "15%",   color: "text-emerald-400",bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="w-full animate-fade-in-up">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl glass-card">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(255,87,34,0.08)" }} />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full blur-[80px]" style={{ background: "rgba(255,112,67,0.06)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] blur-[60px] rotate-12" style={{ background: "rgba(255,138,101,0.04)" }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,87,34,0.4), transparent)" }} />
        </div>

        <div className="relative z-10 p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            {/* LEFT */}
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
                style={{ background: "rgba(255,87,34,0.10)", borderColor: "rgba(255,87,34,0.22)" }}>
                <Zap className="w-3 h-3" style={{ color: "var(--color-orange)" }} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: "#FFAB91" }}>
                  Live Career Insights
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight mb-3">
                Welcome back, <span className="gradient-text">Alex</span> 👋
              </h1>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-2 max-w-lg">
                Your resume ranks in the{" "}
                <span className="font-bold px-2 py-0.5 rounded-lg"
                  style={{ color: "#FFAB91", background: "rgba(255,87,34,0.10)", border: "1px solid rgba(255,87,34,0.22)" }}>
                  top {101 - percentile}%
                </span>{" "}
                of candidates globally.
              </p>
              <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm leading-relaxed mb-6 max-w-lg">
                AI detected{" "}
                <span className="font-semibold" style={{ color: "var(--color-orange-light)" }}>3 high-intent matches</span>{" "}
                aligned with your skills, salary range, and growth goals.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {stats.map((s) => (
                  <StatPill key={s.label} icon={s.icon} label={s.label} value={s.value} color={s.color} bg={s.bg} />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/resume-analysis" className="btn-primary !h-10 !px-5 !text-sm glow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> Explore Matches
                </Link>
                <Link href="/analytics"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group">
                  Open Analytics
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-6 lg:gap-5 shrink-0">
              <div className="flex flex-col items-center gap-3">
                <GaugeRing percentile={percentile} />
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-zinc-400 font-medium">Top {101 - percentile}% globally</span>
                </div>
              </div>

              <div className="w-full sm:w-64 lg:w-56 xl:w-64">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-semibold text-zinc-400">AI Matches</p>
                  <Link href="/job-tracker"
                    className="text-[10px] font-semibold flex items-center gap-0.5 transition-colors hover:opacity-80"
                    style={{ color: "var(--color-orange)" }}>
                    View all <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  {matches.map((m, i) => (
                    <button key={i} onClick={() => setActiveMatch(i)}
                      className="w-full text-left p-3 rounded-xl border transition-all duration-200"
                      style={activeMatch === i
                        ? { background: "rgba(255,87,34,0.10)", borderColor: "rgba(255,87,34,0.30)" }
                        : { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.04)" }}>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                            <span className="text-white text-[9px] font-black">{m.company[0]}</span>
                          </div>
                          <span className="text-white text-xs font-semibold truncate">{m.company}</span>
                        </div>
                        <span className="text-[10px] font-black shrink-0"
                          style={{ color: activeMatch === i ? "#FFAB91" : "#71717a" }}>
                          {m.match}%
                        </span>
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-[10px] truncate pl-7">{m.role}</p>
                      <div className="mt-1.5 pl-7">
                        <div className="h-1 w-full rounded-full bg-white/5">
                          <div className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${m.match}%`,
                              background: activeMatch === i
                                ? "linear-gradient(to right, #FF8A65, #FF5722)"
                                : "#3f3f46"
                            }} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
