import { Plus } from "lucide-react";
import PrimaryButton from "./atoms/buttons/PrimaryButton";

const JobTrackerHead = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-black text-white">Job Tracker</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage and track all your job applications.
        </p>
      </div>
      <PrimaryButton href="#">
        <Plus className="w-4 h-4" /> Add Application
      </PrimaryButton>
    </div>
  );
};

export default JobTrackerHead;
