import { Upload } from "lucide-react";
import PrimaryButton from "./atoms/buttons/PrimaryButton";

const AnalysisHead = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-black text-white">Resume Analysis</h1>
        <p className="text-zinc-500 text-sm mt-1">
          AI-powered resume scoring and optimisation.
        </p>
      </div>
      <PrimaryButton href="#">
        <Upload className="w-4 h-4" /> Upload New Resume
      </PrimaryButton>
    </div>
  );
};

export default AnalysisHead;
