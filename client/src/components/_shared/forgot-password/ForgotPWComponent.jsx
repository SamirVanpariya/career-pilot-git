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
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

export default function ForgotPWComponent() {
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
            <h2 className="font-bold">Password Recovery</h2>
            <p className="text-xs text-zinc-400">
              Secure AI-powered account recovery
            </p>
          </div>
          <Activity className="text-purple-400" />
        </div>

        {/* SAME VISUAL BLOCK */}
        <div className="h-40 bg-black/30 border border-zinc-800 rounded-xl flex items-end justify-between p-4">
          <TrendingUp className="text-purple-400 w-6 h-6" />
          <TrendingUp className="text-purple-500 w-8 h-8" />
          <TrendingUp className="text-purple-400 w-10 h-10" />
          <TrendingUp className="text-purple-600 w-12 h-12" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-zinc-400" />
            <span className="text-xs text-zinc-400">
              Fast & secure password reset
            </span>
          </div>

          <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Protected
          </span>
        </div>
      </div>

      <div className="z-10">
        <h1 className="text-xl font-bold">
          Recover your account access instantly.
        </h1>
        <p className="text-xs text-zinc-400 mt-2">
          Enter your registered email to receive a secure password reset link.
        </p>
      </div>
    </div>

    {/* RIGHT PANEL */}
    <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-xs text-zinc-400">
            Reset your password to continue your AI-powered career journey
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-xs text-zinc-400">Email</label>

            <Input
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter registered email"
              icon={<Mail size={16} />}
            />
          </div>

          {/* SUBMIT */}
          <SecondaryButton type="submit" className="!w-full">
            Send Reset Link <ArrowRight size={16} />
          </SecondaryButton>
        </form>

        {/* SUCCESS */}
        <div className="flex items-center gap-2 text-xs text-green-400">
          Password reset link sent successfully
        </div>

        <p className="text-xs text-zinc-500 text-center">
          Remember your password?{" "}
          <span className="text-white">Login</span>
        </p>
      </div>
    </div>
  </div>
</div>
  );
}
