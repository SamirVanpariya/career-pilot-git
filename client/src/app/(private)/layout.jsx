import Sidebar from "../../components/common/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard layout for authenticated users",
};

export default function PrivateLayout({ children }) {
  return (
    <>
      <main className="flex wrap gap-[10px]  w-full  ">
        <Sidebar />
        <div className="flex-1 bg-[#1E1E1E] rounded-xl md:p-6 p-3 md:m-4 m-[70px_15px]">
          {children}
        </div>
      </main>
    </>
  );
}
