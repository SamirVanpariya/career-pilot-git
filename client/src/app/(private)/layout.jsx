import Sidebar from "../../components/common/Sidebar";

export const metadata = {
  title: "CareerPilot — Dashboard",
  description: "AI-powered career intelligence dashboard",
};

export default function PrivateLayout({ children }) {
  return (
    <main className="flex min-h-screen w-full bg-[var(--color-bg)]">
      <Sidebar />
      {/* Main content — offset for sidebar on desktop, top bar on mobile */}
      <div className="flex-1 min-w-0 md:ml-0 p-4 sm:p-5 md:p-6 mt-[60px] md:mt-0 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
