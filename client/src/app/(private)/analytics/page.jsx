import { BarChart2, Users, Target, Award } from "lucide-react";
import AnalyticsHead from "@/components/AnalyticsHead";
import AnalyticsStats from "@/components/AnalyticsStats";
import MonthlyApplications from "@/components/MonthlyApplications";
import DemandSkills from "@/components/DemandSkills";

const kpis = [
  {
    label: "Total Applications",
    value: "142",
    change: "+18%",
    trend: "up",
    icon: BarChart2,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    label: "Response Rate",
    value: "23%",
    change: "+5%",
    trend: "up",
    icon: Users,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
  },
  {
    label: "Interview Conversion",
    value: "15%",
    change: "-2%",
    trend: "down",
    icon: Target,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Offer Rate",
    value: "8%",
    change: "+3%",
    trend: "up",
    icon: Award,
    color: "text-orange-200",
    bg: "bg-orange-300/10",
  },
];

const monthlyData = [
  { month: "Jan", apps: 8, interviews: 2 },
  { month: "Feb", apps: 12, interviews: 3 },
  { month: "Mar", apps: 18, interviews: 5 },
  { month: "Apr", apps: 14, interviews: 4 },
  { month: "May", apps: 22, interviews: 7 },
  { month: "Jun", apps: 28, interviews: 9 },
  { month: "Jul", apps: 20, interviews: 6 },
  { month: "Aug", apps: 32, interviews: 11 },
];
const maxApps = Math.max(...monthlyData.map((d) => d.apps));

const topCompanies = [
  {
    name: "Stripe",
    applied: 3,
    status: "Interview",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-400/10",
  },
  {
    name: "Vercel",
    applied: 2,
    status: "Offer",
    statusColor: "text-orange-400",
    statusBg: "bg-orange-400/10",
  },
  {
    name: "Linear",
    applied: 4,
    status: "Pending",
    statusColor: "text-amber-400",
    statusBg: "bg-amber-400/10",
  },
  {
    name: "Figma",
    applied: 2,
    status: "Rejected",
    statusColor: "text-red-400",
    statusBg: "bg-red-400/10",
  },
  {
    name: "Notion",
    applied: 1,
    status: "Interview",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-400/10",
  },
];

const skillDemand = [
  { skill: "React", demand: 94 },
  { skill: "TypeScript", demand: 87 },
  { skill: "Node.js", demand: 76 },
  { skill: "Next.js", demand: 71 },
  { skill: "GraphQL", demand: 58 },
  { skill: "AWS", demand: 52 },
];

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in-up">
      <AnalyticsHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]">
        <AnalyticsStats kpis={kpis} />
        <MonthlyApplications
          topCompanies={topCompanies}
          monthlyData={monthlyData}
          maxApps={maxApps}
        />
        <DemandSkills skillDemand={skillDemand} />
      </div>
    </div>
  );
}
