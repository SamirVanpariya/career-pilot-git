"use client";

import React, { useState } from "react";

// Lucide Icons only (NO SVG USED)
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Activity,
  Users,
} from "lucide-react";
import Input from "@/components/atoms/input/Input";

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e) => {};

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-white flex flex-col">
      {/* MAIN GRID */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* LEFT PANEL */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 border-r border-zinc-800 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full" />

          {/* BRAND */}
          <div className="flex items-center gap-2 z-10">
            <TrendingUp className="text-indigo-400" />
            <span className="font-bold tracking-widest text-sm">
              CareerPilot AI
            </span>
          </div>

          {/* CARD */}
          <div className="z-10 bg-[#161618] border border-zinc-800 rounded-2xl p-6 space-y-5">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold">Career Growth Index</h2>
                <p className="text-xs text-zinc-400">
                  AI-powered market insights
                </p>
              </div>
              <Activity className="text-purple-400" />
            </div>

            {/* Replaced SVG with Lucide-based visual block */}
            <div className="h-40 bg-black/30 border border-zinc-800 rounded-xl flex items-end justify-between p-4">
              <TrendingUp className="text-purple-400 w-6 h-6" />
              <TrendingUp className="text-purple-500 w-8 h-8" />
              <TrendingUp className="text-purple-400 w-10 h-10" />
              <TrendingUp className="text-purple-600 w-12 h-12" />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-zinc-400" />
                <span className="text-xs text-zinc-400">12k+ users</span>
              </div>

              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                +24% Growth
              </span>
            </div>
          </div>

          <div className="z-10">
            <h1 className="text-xl font-bold">
              Build your future with AI precision.
            </h1>
            <p className="text-xs text-zinc-400 mt-2">
              Join professionals optimizing careers with real-time insights.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Create account</h1>
              <p className="text-xs text-zinc-400">
                Start your AI-powered career journey
              </p>
            </div>

            {/* SOCIAL */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-10 bg-[#161618] border border-zinc-800 rounded-lg text-xs">
                Google
              </button>
              <button className="flex items-center justify-center gap-2 h-10 bg-[#161618] border border-zinc-800 rounded-lg text-xs">
                GitHub
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="text-xs text-zinc-400">Full Name</label>

                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Enter full name"
                  icon={<User size={16} />}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs text-zinc-400">Email</label>

                <Input
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email"
                  icon={<Mail size={16} />}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs text-zinc-400">Password</label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter password"
                    icon={<Lock size={16} />}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* TERMS */}
              <label className="flex items-center gap-2 text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      agreeToTerms: e.target.checked,
                    })
                  }
                />
                I agree to terms
              </label>

              {/* SUBMIT */}
              <button className="w-full h-11 bg-purple-600 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                <span className="animate-spin border-2 border-white border-t-transparent w-4 h-4 rounded-full" />
                <>
                  Create Account <ArrowRight size={16} />
                </>
              </button>
            </form>

            {/* SUCCESS */}
            <div className="flex items-center gap-2 text-xs text-green-400">
              Account created successfully
            </div>

            <p className="text-xs text-zinc-500 text-center">
              Already have an account? <span className="text-white">Login</span>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-4 text-xs text-zinc-500 flex justify-between px-6">
        <span>© 2026 CareerPilot AI</span>

        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <HelpCircle size={12} /> Support
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} /> Security
          </span>
        </div>
      </footer>
    </div>
  );
}
