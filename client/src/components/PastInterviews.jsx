"use client";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { CheckCircle } from "lucide-react";
import LoadingWrpNew from "./common/LoadingWrpNew";
import { getJobByIdAPI } from "@/services/jobService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import InterviewDetailSidebar from "./InterviewDetailSidebar";
import { getInterviewByIdAPI } from "@/services/interviewService";
import Link from "next/link";
const PastInterviews = ({ pastInterviews, isPastLoading }) => {
  const [currentID, setCurrentID] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  console.log("pastInterviews", pastInterviews);

  const viewInterview = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentID(Number(id));
    setOpenSidebar(true);
  };

  const {
    data: interviewData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["interview", currentID],
    queryFn: () => getInterviewByIdAPI(currentID),
    enabled: !!currentID,
  });
  if (isError)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-400">
          {error.message || "Error loading job details"}
        </p>
      </div>
    );
  console.log("interviewData current", interviewData);

  return (
    <>
      <Grid size={{ xs: 12, lg: 6 }}>
        <CardWrp className="relative mt-0 h-full">
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,87,34,0.12)" }}
            >
              <CheckCircle
                className="w-4 h-4"
                style={{ color: "var(--color-orange)" }}
              />
            </div>
            <h2 className="text-lg font-bold text-white">Past Interviews</h2>
            <span className="absolute z-[-1] top-[-20px] leading-[100%] right-4 text-amber-100 ml-auto text-[220px] opacity-[0.05] font-bold rounded-full">
              {pastInterviews?.length}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {isPastLoading && <LoadingWrpNew />}

            {pastInterviews?.length === 0 && (
              <p className="text-center text-[var(--color-text-secondary)]">
                No past interviews
              </p>
            )}
            {pastInterviews?.map((item) => (
              <Link
                href={`/job-tracker/${item?.applicationId}`}
                key={item?.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-black">
                    {item?.application?.companyName[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">
                    {item?.application?.companyName}
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                    {item?.scheduledDate
                      ? new Date(item.scheduledDate).toDateString()
                      : "TBD"}{" "}
                    <span className="text-green-400 flex items-center gap-1.5 text-sm capitalize">
                      <p className="text-white">Stage :</p> {item?.stage}
                    </span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => viewInterview(item?.id, e)}
                      className="cursor-pointer bg-orange-500 px-2 py-0.5 rounded-full"
                    >
                      View
                    </button>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.outcomeBg} ${item.outcomeColor}`}
                  >
                    {item?.result || "not given yet"}
                  </span>
                  <p className="text-zinc-600 text-xs mt-1">
                    Score: {item?.score || "not given yet"}%
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-zinc-400 text-sm font-medium">
                Average Interview Score
              </p>
              <span className="text-white font-black text-lg">82%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5">
              <div className="progress-bar" style={{ width: "82%" }} />
            </div>
            <p className="text-zinc-600 text-xs mt-2">
              Top 18% of candidates on this platform
            </p>
          </div>
        </CardWrp>
      </Grid>

      <InterviewDetailSidebar
        interviewData={interviewData}
        isLoading={isLoading}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
    </>
  );
};

export default PastInterviews;
