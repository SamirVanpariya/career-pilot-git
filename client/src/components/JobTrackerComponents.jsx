"use client";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
} from "lucide-react";
import JobTrackerHead from "@/components/JobTrackerHead";
import JobStates from "@/components/JobStates";
import ApplicationBoard from "@/components/ApplicationBoard";

const columns = [
  {
    id: "applied",
    label: "Applied",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    id: "interview",
    label: "Interview",
    icon: MessageSquare,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  {
    id: "offer",
    label: "Offer",
    icon: Star,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    id: "rejected",
    label: "Rejected",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
];

const jobs = [
  {
    id: 1,
    company: "Stripe",
    role: "Senior Frontend Engineer",
    location: "Remote",
    salary: "$160k–$200k",
    status: "applied",
    date: "Jun 12",
    priority: "high",
  },
  {
    id: 2,
    company: "Vercel",
    role: "Staff Engineer",
    location: "San Francisco, CA",
    salary: "$180k–$220k",
    status: "interview",
    date: "Jun 10",
    priority: "high",
  },
  {
    id: 3,
    company: "Linear",
    role: "Product Engineer",
    location: "Remote",
    salary: "$140k–$170k",
    status: "applied",
    date: "Jun 8",
    priority: "medium",
  },
  {
    id: 4,
    company: "Figma",
    role: "Frontend Developer",
    location: "New York, NY",
    salary: "$130k–$160k",
    status: "rejected",
    date: "Jun 5",
    priority: "low",
  },
  {
    id: 5,
    company: "Notion",
    role: "Software Engineer",
    location: "Remote",
    salary: "$150k–$185k",
    status: "interview",
    date: "Jun 3",
    priority: "high",
  },
  {
    id: 6,
    company: "Loom",
    role: "React Developer",
    location: "Remote",
    salary: "$120k–$150k",
    status: "offer",
    date: "May 28",
    priority: "high",
  },
  {
    id: 7,
    company: "Intercom",
    role: "UI Engineer",
    location: "Dublin, IE",
    salary: "$110k–$140k",
    status: "rejected",
    date: "May 25",
    priority: "low",
  },
  {
    id: 8,
    company: "Planetscale",
    role: "Full Stack Engineer",
    location: "Remote",
    salary: "$145k–$175k",
    status: "applied",
    date: "May 22",
    priority: "medium",
  },
];

const priorityStyles = {
  high: { label: "High", color: "text-red-400", bg: "bg-red-400/10" },
  medium: { label: "Med", color: "text-amber-400", bg: "bg-amber-400/10" },
  low: { label: "Low", color: "text-zinc-400", bg: "bg-zinc-400/10" },
};

const summaryStats = [
  {
    label: "Total Tracked",
    value: "8",
    icon: Briefcase,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    label: "Active",
    value: "5",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Interviews",
    value: "2",
    icon: MessageSquare,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
  },
  {
    label: "Offers",
    value: "1",
    icon: Star,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];
const JobTrackerComponents = () => {
  return (
    <div className="animate-fade-in-up">
      <JobTrackerHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]  ">
        <JobStates summaryStats={summaryStats} />

        <ApplicationBoard
          columns={columns}
          jobs={jobs}
          priorityStyles={priorityStyles}
        />
      </div>
    </div>
  );
};

export default JobTrackerComponents;
