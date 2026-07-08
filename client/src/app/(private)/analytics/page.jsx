import AnalyticsHead from "@/components/AnalyticsHead";
import AnalyticsStats from "@/components/AnalyticsStats";
import MonthlyApplications from "@/components/MonthlyApplications";
import DemandSkills from "@/components/DemandSkills";

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

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in-up">
      <AnalyticsHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]">
        <AnalyticsStats />
        <MonthlyApplications
          topCompanies={topCompanies}
          monthlyData={monthlyData}
          maxApps={maxApps}
        />
        <DemandSkills />
      </div>
    </div>
  );
}
