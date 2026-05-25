"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Input from "@/components/atoms/input/Input";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(true);

      setTimeout(() => setSuccessMsg(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-white flex flex-col">
      {/* MAIN GRID */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* LEFT PANEL */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 border-r border-zinc-800 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

          {/* BRAND */}
          <div className="flex items-center gap-2 z-10">
            <TrendingUp className="text-indigo-400" />
            <span className="text-sm font-bold tracking-widest">
              CareerPilot
            </span>
          </div>

          {/* HERO TEXT */}
          <div className="z-10 space-y-4">
            <h1 className="text-3xl font-black leading-tight">
              Navigate your future with precision.
            </h1>
            <p className="text-xs text-zinc-400 max-w-sm">
              AI-powered insights to accelerate your career growth.
            </p>
          </div>

          <p className="text-[10px] text-zinc-600 z-10">
            © 2026 CareerPilot AI
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md space-y-6">
            {/* HEADER */}
            <div>
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-xs text-zinc-400">Sign in to your account</p>
            </div>

            {/* SOCIAL */}
            <div className="grid grid-cols-2 gap-3">
              <button className="h-11 flex items-center justify-center gap-2 bg-[#161618] border border-zinc-800 rounded-lg text-xs">
                Google
              </button>

              <button className="h-11 flex items-center justify-center gap-2 bg-[#161618] border border-zinc-800 rounded-lg text-xs">
                GitHub
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <div>
                <label className="text-xs text-zinc-400">Email</label>
                <Input
                  type={"email"}
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
              </div>

              {/* REMEMBER */}
              <label className="flex items-center gap-2 text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rememberMe: e.target.checked,
                    })
                  }
                />
                Remember me
              </label>

              {/* SUBMIT */}

              <SecondaryButton
                type="submit"
                disabled={isSubmitting}
                className="!w-full"
              >
                Sign in <ArrowRight size={14} />
              </SecondaryButton>
            </form>

            {/* SUCCESS */}
            {successMsg && (
              <div className="flex items-center gap-2 text-xs text-green-400">
                <CheckCircle2 size={14} />
                Login successful
              </div>
            )}

            <p className="text-xs text-zinc-500 text-center">
              Don’t have an account?{" "}
              <Link href="#" className="text-white font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
