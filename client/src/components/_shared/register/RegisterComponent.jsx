"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Zap, CheckCircle, TrendingUp, Users, Award } from "lucide-react";
import Input from "@/components/atoms/input/Input";

const perks = [
  { icon: TrendingUp, text: "AI resume scoring & optimisation" },
  { icon: Users, text: "Smart job application tracker" },
  { icon: Award, text: "AI-powered interview preparation" },
];

function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["bg-red-500", "bg-amber-500", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Strong"];

  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < score ? colors[score - 1] : "bg-zinc-800"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map((c) => (
            <span key={c.label} className={`text-[10px] flex items-center gap-1 ${c.pass ? "text-emerald-400" : "text-zinc-600"}`}>
              <CheckCircle className="w-2.5 h-2.5" /> {c.label}
            </span>
          ))}
        </div>
        {score > 0 && <span className={`text-[10px] font-bold ${colors[score - 1].replace("bg-", "text-")}`}>{labels[score - 1]}</span>}
      </div>
    </div>
  );
}

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", agreeToTerms: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) return;
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSuccess(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden border-r border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full" style={{ background: "rgba(255,112,67,0.07)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] blur-[80px] rounded-full" style={{ background: "rgba(255,87,34,0.05)" }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <Link href="/" className="flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-xl gradient-bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-lg">Career<span className="gradient-text">Pilot</span></span>
        </Link>

        <div className="z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              Build your future<br />with <span className="gradient-text">AI precision</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Everything you need to land your dream job — resume scoring, job tracking, interview prep, and more.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,87,34,0.10)" }}>
                    <Icon className="w-4 h-4" style={{ color: "var(--color-orange)" }} />
                  </div>
                  <span className="text-zinc-300 text-sm">{p.text}</span>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[{ v: "50K+", l: "Users" }, { v: "3.2x", l: "Faster" }, { v: "4.9★", l: "Rating" }].map((s) => (
              <div key={s.l} className="glass-card rounded-xl p-3 text-center">
                <p className="text-lg font-black gradient-text">{s.v}</p>
                <p className="text-zinc-500 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-zinc-700 text-xs z-10">© 2026 CareerPilot AI. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg gradient-bg-primary flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-white">Career<span className="gradient-text">Pilot</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Create your account</h1>
            <p className="text-zinc-500 text-sm">Start your AI-powered career journey — free forever</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Google", "GitHub"].map((p) => (
              <button key={p} className="btn-secondary !h-11 !text-sm !w-full !justify-center">{p}</button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-zinc-600 text-xs">or sign up with email</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-white font-black text-xl mb-2">Account created!</h3>
              <p className="text-zinc-400 text-sm mb-6">Welcome to CareerPilot. Let's get started.</p>
              <Link href="/dashboard" className="btn-primary !w-full !justify-center">Go to Dashboard <ArrowRight size={16} /></Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Full Name</label>
                <Input name="fullName" value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Alex Johnson" icon={<User size={16} />} />
              </div>

              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email</label>
                <Input type="email" name="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com" icon={<Mail size={16} />} />
              </div>

              <div>
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Password</label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} name="password" value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a strong password" icon={<Lock size={16} />} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors mt-0.5">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <PasswordStrength password={formData.password} />
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-zinc-700 bg-zinc-800 shrink-0"
                  style={{ accentColor: "var(--color-orange)" }} />
                <span className="text-zinc-400 text-sm">
                  I agree to the{" "}
                  <Link href="#" className="hover:opacity-80" style={{ color: "var(--color-orange)" }}>Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="#" className="hover:opacity-80" style={{ color: "var(--color-orange)" }}>Privacy Policy</Link>
                </span>
              </label>

              <button type="submit" disabled={isSubmitting || !formData.agreeToTerms}
                className={`btn-primary !w-full !justify-center !h-11 mt-1 ${(!formData.agreeToTerms || isSubmitting) ? "opacity-50 cursor-not-allowed" : ""}`}>
                {isSubmitting ? "Creating account..." : <><span>Create Account</span><ArrowRight size={16} /></>}
              </button>
            </form>
          )}

          <p className="text-zinc-500 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold transition-colors hover:opacity-80" style={{ color: "var(--color-orange)" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
