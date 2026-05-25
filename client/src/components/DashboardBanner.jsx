"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Card,
  Typography,
  IconButton,
  Button,
  Slider,
  Collapse,
  Tooltip,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import PrimaryButton from "./atoms/buttons/PrimaryButton";

export default function DashboardBanner() {
  const [percentile, setPercentile] = useState(95);
  const [showOpportunities, setShowOpportunities] = useState(false);

  const radius = 85;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (percentile / 100) * (circumference * 0.85);

  const mockJobs = [
    {
      id: 1,
      title: "Senior AI Product Developer",
      company: "Stripe",
      match: "98% Match",
      location: "San Francisco, CA (Hybrid)",
      salary: "$180k - $220k",
      logo: "/logos/stripe.png",
      href: "/jobs/stripe-ai-product-developer",
    },
    {
      id: 2,
      title: "Lead Frontend Engineer - AI Platform",
      company: "Vercel",
      match: "96% Match",
      location: "Remote (US/Canada)",
      salary: "$165k - $195k",
      logo: "/logos/vercel.png",
      href: "/jobs/vercel-frontend-engineer",
    },
    {
      id: 3,
      title: "Machine Learning UI/UX Specialist",
      company: "Anthropic",
      match: "95% Match",
      location: "San Francisco, CA",
      salary: "$190k - $240k",
      logo: "/logos/anthropic.png",
      href: "/jobs/anthropic-ml-uiux",
    },
  ];

  return (
    <div className="w-full relative z-10">
      {/* MAIN CARD */}
      <Card className="relative overflow-hidden rounded-[36px] border border-[#202338] bg-[#0D0F17]/95 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]">
        {/* GLOW */}
        <div className="absolute top-[-80px] right-[-80px] w-[260px] h-[260px] rounded-full bg-[#5C30E1]/20 blur-[120px]" />

        <div className="absolute bottom-[-80px] left-[-80px] w-[240px] h-[240px] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative z-10 p-6 md:p-10 lg:p-14 bg-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT */}
            <div className="">
              <div className="inline-flex items-center gap-2 bg-[#171926] border border-[#26293E] px-4 py-2 rounded-full">
                <BoltRoundedIcon className="text-[#8C76FF]" />

                <span className="text-xs font-bold tracking-[0.18em] text-[#C3B4FF] uppercase">
                  Live Career Insights
                </span>
              </div>

              <Typography className="!mt-7 !leading-[1.05] !font-black">
                <span className="block text-[42px] md:text-[60px]">
                  Welcome back, Alex 👋
                </span>
              </Typography>

              <p className="text-[#A4A7C1] text-[15px] md:text-[16px] leading-8 mt-7 max-w-xl">
                Your resume currently ranks in the
                <span className="mx-2 font-bold text-[#C3B4FF] bg-[#5C30E1]/10 border border-[#5C30E1]/20 px-3 py-1 rounded-xl">
                  top {101 - percentile}%
                </span>
                of candidates globally.
              </p>

              <p className="text-[#8B90B5] text-sm mt-4 leading-7 max-w-xl">
                Our AI engine detected 3 high-intent opportunities matching your
                skill graph, salary expectations, and growth trajectory.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PrimaryButton
                  variant="contained"
                  onClick={() => setShowOpportunities(!showOpportunities)}
                >
                  Explore Matches
                </PrimaryButton>

                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-2 text-[#C3B4FF] hover:text-white transition-all"
                >
                  <span className="font-semibold">Open Analytics</span>

                  <ArrowOutwardRoundedIcon fontSize="small" />
                </Link>
              </div>
            </div>

            {/* RIGHT GAUGE */}
            <div className="flex items-center justify-center">
              <div className="relative w-[280px] h-[280px]">
                {/* OUTER RING */}
                <svg
                  className="w-full h-full rotate-[-135deg]"
                  viewBox="0 0 200 200"
                >
                  <defs>
                    <linearGradient
                      id="gaugeGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#C3B4FF" />
                      <stop offset="100%" stopColor="#5C30E1" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="#1F2338"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference * 0.85} ${circumference}`}
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="url(#gaugeGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference * 0.85} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700"
                  />
                </svg>

                {/* CENTER */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[180px] h-[180px] rounded-full bg-[#10121C] border border-[#23263B] flex flex-col items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                    <span className="text-5xl font-black">{percentile}%</span>

                    <span className="text-xs tracking-[0.3em] text-[#8C76FF] font-bold mt-3">
                      PERCENTILE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
