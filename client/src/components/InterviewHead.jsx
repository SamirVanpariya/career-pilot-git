import { Calendar } from "lucide-react";
import PrimaryButton from "./atoms/buttons/PrimaryButton";

const InterviewHead = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-black text-white">Interviews</h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">
          Track, prepare, and ace every interview.
        </p>
      </div>
      <PrimaryButton href="#">
        <Calendar className="w-4 h-4" /> Schedule Interview
      </PrimaryButton>
    </div>
  );
};

export default InterviewHead;
