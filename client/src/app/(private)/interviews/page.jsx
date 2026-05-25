import Grid from "@mui/material/Grid";
import {
  Video,
  Calendar,
  CheckCircle,
  Mic,
  BookOpen,
  TrendingUp,
  Play,
  Award,
} from "lucide-react";
import InterviewHead from "@/components/InterviewHead";
import InterviewStates from "@/components/InterviewStates";
import UpcomingInterview from "@/components/UpcomingInterview";
import PastInterviews from "@/components/PastInterviews";
import InterviewPrep from "@/components/InterviewPrep";
import MockInterview from "@/components/MockInterview";

const summaryStats = [
  {
    label: "Total Interviews",
    value: "12",
    icon: Video,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    label: "Upcoming",
    value: "3",
    icon: Calendar,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
  },
  {
    label: "Completed",
    value: "8",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Avg. Score",
    value: "82%",
    icon: Award,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

const upcoming = [
  {
    company: "Stripe",
    role: "Senior Frontend Engineer",
    type: "Technical",
    date: "Tomorrow",
    time: "10:00 AM",
    interviewer: "Sarah Chen",
    round: "Round 2",
    typeColor: "text-orange-400",
    typeBg: "bg-orange-400/10",
  },
  {
    company: "Vercel",
    role: "Staff Engineer",
    type: "System Design",
    date: "Jun 20",
    time: "2:00 PM",
    interviewer: "Mark Liu",
    round: "Round 3",
    typeColor: "text-orange-300",
    typeBg: "bg-orange-300/10",
  },
  {
    company: "Notion",
    role: "Software Engineer",
    type: "Behavioural",
    date: "Jun 23",
    time: "11:30 AM",
    interviewer: "Priya Nair",
    round: "Round 1",
    typeColor: "text-amber-400",
    typeBg: "bg-amber-400/10",
  },
];

const past = [
  {
    company: "Linear",
    role: "Product Engineer",
    type: "Technical",
    date: "Jun 10",
    outcome: "Passed",
    score: 88,
    outcomeColor: "text-emerald-400",
    outcomeBg: "bg-emerald-400/10",
  },
  {
    company: "Figma",
    role: "Frontend Developer",
    type: "System Design",
    date: "Jun 5",
    outcome: "Rejected",
    score: 61,
    outcomeColor: "text-red-400",
    outcomeBg: "bg-red-400/10",
  },
  {
    company: "Loom",
    role: "React Developer",
    type: "Behavioural",
    date: "May 30",
    outcome: "Passed",
    score: 91,
    outcomeColor: "text-emerald-400",
    outcomeBg: "bg-emerald-400/10",
  },
  {
    company: "Intercom",
    role: "UI Engineer",
    type: "Technical",
    date: "May 22",
    outcome: "Pending",
    score: 75,
    outcomeColor: "text-amber-400",
    outcomeBg: "bg-amber-400/10",
  },
];

const prepResources = [
  {
    title: "System Design Fundamentals",
    category: "System Design",
    duration: "45 min",
    difficulty: "Advanced",
    icon: TrendingUp,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    diffColor: "text-red-400",
    diffBg: "bg-red-400/10",
  },
  {
    title: "Behavioural Interview Mastery",
    category: "Soft Skills",
    duration: "30 min",
    difficulty: "Beginner",
    icon: Mic,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
    diffColor: "text-emerald-400",
    diffBg: "bg-emerald-400/10",
  },
  {
    title: "React Deep Dive Q&A",
    category: "Technical",
    duration: "60 min",
    difficulty: "Intermediate",
    icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    diffColor: "text-amber-400",
    diffBg: "bg-amber-400/10",
  },
  {
    title: "Mock Interview: Live Coding",
    category: "Practice",
    duration: "90 min",
    difficulty: "Advanced",
    icon: Play,
    color: "text-orange-200",
    bg: "bg-orange-300/10",
    diffColor: "text-red-400",
    diffBg: "bg-red-400/10",
  },
];

export default function InterviewsPage() {
  return (
    <div className="animate-fade-in-up">
      <InterviewHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]">
        <InterviewStates summaryStats={summaryStats} />
        <Grid container spacing={3} className="mt-0">
          <UpcomingInterview upcoming={upcoming} />
          <PastInterviews past={past} />
        </Grid>
        <InterviewPrep prepResources={prepResources} />
        <MockInterview />
      </div>
    </div>
  );
}
