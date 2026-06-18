"use client";
import * as React from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DollarSign,
  EditIcon,
  MapPin,
  Trash2,
  GripVertical,
} from "lucide-react";
import CardWrp from "./CardWrp";
import Select from "./atoms/select/Select";
import Textarea from "./atoms/textarea/Textarea";
import EditJobModal from "./EditJobModal";
import DeleteJobModal from "./DeleteJobModal";
import Link from "next/link";

const options = ["edit", "delete"];
const ITEM_HEIGHT = 48;

const ApplicationBoard = ({ columns, jobs: initialJobs }) => {
  const STATUS = ["saved", "applied", "interview", "offer", "rejected"];
  const [jobs, setJobs] = useState(initialJobs || []);
  const [openNoteJobId, setOpenNoteJobId] = useState(null);
  const [tempNotes, setTempNotes] = useState({});
  const [editJobID, setEditJobID] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [draggedJob, setDraggedJob] = useState(null);

  // menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const open = Boolean(anchorEl);

  // Drag and Drop Handlers
  const handleDragStart = (e, job) => {
    setDraggedJob(job);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify(job));
    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
    setDraggedJob(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();

    let draggedJobData = draggedJob;

    // If for some reason draggedJob is null, try to get from dataTransfer
    if (!draggedJobData) {
      try {
        draggedJobData = JSON.parse(e.dataTransfer.getData("text/plain"));
      } catch (error) {
        console.error("Failed to parse drag data:", error);
        return;
      }
    }

    if (!draggedJobData) return;

    // Update job status
    if (draggedJobData.status !== targetStatus) {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === draggedJobData.id ? { ...job, status: targetStatus } : job,
        ),
      );
    }
  };

  // Reorder jobs within the same column
  const handleDropReorder = (e, targetJob, targetStatus) => {
    e.preventDefault();

    if (!draggedJob) return;

    if (draggedJob.id === targetJob.id) return;

    // If dropping in the same status column, reorder
    if (draggedJob.status === targetStatus) {
      setJobs((prevJobs) => {
        const jobsInColumn = prevJobs.filter(
          (job) => job.status === targetStatus,
        );
        const otherJobs = prevJobs.filter((job) => job.status !== targetStatus);

        const oldIndex = jobsInColumn.findIndex(
          (job) => job.id === draggedJob.id,
        );
        const newIndex = jobsInColumn.findIndex(
          (job) => job.id === targetJob.id,
        );

        const reorderedColumn = [...jobsInColumn];
        const [removed] = reorderedColumn.splice(oldIndex, 1);
        reorderedColumn.splice(newIndex, 0, removed);

        return [...otherJobs, ...reorderedColumn];
      });
    } else {
      // If dropping in different column, just change status
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === draggedJob.id ? { ...job, status: targetStatus } : job,
        ),
      );
    }
  };

  // change status
  const handleChangeStatus = (jobId, newStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: newStatus,
            }
          : job,
      ),
    );
  };

  // note toggle
  const handleAddNote = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);

    setTempNotes((prev) => ({
      ...prev,
      [jobId]: job?.notes || "",
    }));

    setOpenNoteJobId((prev) => (prev === jobId ? null : jobId));
  };

  // note change
  const handleNoteChange = (jobId, value) => {
    setTempNotes((prev) => ({
      ...prev,
      [jobId]: value,
    }));
  };

  // note save
  const handleSaveNote = (jobId) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              notes: tempNotes[jobId],
            }
          : job,
      ),
    );

    setOpenNoteJobId(null);
  };

  // menu open
  const handleClick = (event, jobId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedJobId(jobId);
  };

  // menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // edit modal
  const handleEditModalOpen = (jobId) => {
    setEditJobID(jobId);
    setIsEditModalOpen(true);
    handleClose();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditJobID(null);
  };

  // delete job
  const handleDeleteJob = (jobId) => {
    setIsDeleteModalOpen(true);
    setSelectedJobId(jobId);
    handleClose();
  };

  // delete job confirm
  const handleDeleteConfirm = (jobId) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    setIsDeleteModalOpen(false);
    setSelectedJobId(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedJobId(null);
  };

  return (
    <>
      <style jsx global>{`
        .job-card.dragging {
          opacity: 0.7;
          cursor: grabbing;
        }

        .column-drop-zone.drag-over {
          background: rgba(255, 165, 0, 0.1);
          border: 2px dashed orange;
        }

        .job-card {
          cursor: grab;
        }

        .job-card:active {
          cursor: grabbing;
        }
      `}</style>

      <CardWrp>
        <h2 className="text-lg font-bold text-white mb-5">
          Application Board - (Kanban view with Drag & Drop)
        </h2>

        {/* <Grid container spacing={2}> */}
        <div className="flex  gap-4 overflow-x-auto w-full">
          {columns.map((col) => {
            const ColIcon = col.icon;
            const colJobs = jobs.filter((job) => job.status === col.id);

            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className="flex-shrink-0 w-[310px] column-drop-zone transition-all duration-200 rounded-xl "
              >
                <div className="flex flex-col gap-5">
                  {/* column header */}
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border ${col.border} ${col.bg}`}
                  >
                    <div className="flex items-center gap-2">
                      <ColIcon className={`w-4 h-4 ${col.color}`} />

                      <span className={`text-sm font-bold ${col.color}`}>
                        {col.label}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full bg-black/20 ${col.color}`}
                    >
                      {colJobs.length}
                    </span>
                  </div>

                  {/* jobs */}
                  <div className="flex flex-col gap-4 min-h-[120px] ">
                    {colJobs.map((job, index) => {
                      return (
                        <div
                          key={job.id}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, job)}
                          onDragEnd={handleDragEnd}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropReorder(e, job, col.id)}
                          className="glass-card rounded-xl p-4 flex flex-col gap-3 hover:border-orange-500/25 hover:translate-y-[-1px] transition-all duration-200 job-card group"
                        >
                          {/* drag handle indicator */}
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="w-4 h-4 text-white/40" />
                          </div>

                          {/* top section */}
                          <div className="flex items-start justify-between gap-2 pl-6">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                <span className="text-white text-xs font-bold">
                                  {job.company?.[0]}
                                </span>
                              </div>

                              <span className="text-white text-sm font-bold truncate">
                                {job.company}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* status select */}
                              <Select
                                name="status"
                                value={job.status}
                                onChange={(e) =>
                                  handleChangeStatus(job.id, e.target.value)
                                }
                                options={STATUS}
                                placeholder="Move to..."
                                className="!w-[100px] !h-[30px]"
                              />

                              {/* menu */}
                              <div>
                                <IconButton
                                  aria-label="more"
                                  id={`long-button-${job.id}`}
                                  aria-controls={open ? "long-menu" : undefined}
                                  aria-expanded={open ? "true" : undefined}
                                  aria-haspopup="true"
                                  onClick={(event) =>
                                    handleClick(event, job.id)
                                  }
                                  sx={{
                                    "&.MuiButtonBase-root": {
                                      width: "30px",
                                      height: "30px",
                                    },
                                  }}
                                >
                                  <MoreVertIcon sx={{ color: "#fff" }} />
                                </IconButton>
                              </div>
                            </div>
                          </div>

                          {/* role */}
                          <p className="text-zinc-300 text-xs leading-relaxed pl-6">
                            {job.role}
                          </p>

                          {/* location + salary */}
                          <div className="flex flex-col gap-1 pl-6">
                            <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] text-xs">
                              <MapPin className="w-3 h-3 shrink-0" />

                              <span className="truncate">{job.location}</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] text-xs">
                              <DollarSign className="w-3 h-3 shrink-0" />

                              <span>{job.salary}</span>
                            </div>
                          </div>

                          {/* date */}
                          <div className="pt-2 border-t border-white/5 pl-6">
                            <span className="text-zinc-600 text-xs">
                              Applied {job.date}
                            </span>
                          </div>

                          {/* notes */}
                          {openNoteJobId === job.id ? (
                            <>
                              <Textarea
                                name="notes"
                                value={tempNotes[job.id] || ""}
                                onChange={(e) =>
                                  handleNoteChange(job.id, e.target.value)
                                }
                                placeholder="e.g. Applied via LinkedIn on May 10, referral from Rahul, follow up in 1 week, strong match for React skills"
                              />

                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setOpenNoteJobId(null)}
                                  className="px-2 py-1 text-[12px] w-fit rounded-[25px] bg-red-700 text-white cursor-pointer"
                                >
                                  Cancel
                                </button>

                                <button
                                  onClick={() => handleSaveNote(job.id)}
                                  className="px-2 py-1 text-[12px] w-fit rounded-[25px] bg-green-700 text-white cursor-pointer"
                                >
                                  Save
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              {job?.notes && (
                                <p className="text-zinc-300 text-sm pl-6">
                                  <span className="text-white">Note:</span>{" "}
                                  {job?.notes}
                                </p>
                              )}

                              <button
                                onClick={() => handleAddNote(job.id)}
                                className="px-4 py-2 border border-dashed border-white/30 hover:border-orange-500/50 cursor-pointer w-full rounded-full text-white text-xs font-bold transition-colors duration-200"
                              >
                                {job?.notes ? "Edit Note" : "Add Note"}
                              </button>
                            </>
                          )}

                          {/* view details */}
                          <Link
                            href={`/job-tracker/${job.id}`}
                            className="px-4 py-2 text-center border border-dashed border-green-500/50 hover:border-orange-500/50 cursor-pointer w-full rounded-full text-white text-xs font-bold transition-colors duration-200"
                          >
                            View Details
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* </Grid> */}
      </CardWrp>

      {/* global menu */}
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "10ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              if (option === "edit") {
                handleEditModalOpen(selectedJobId);
              }

              if (option === "delete") {
                handleDeleteJob(selectedJobId);
              }
            }}
          >
            <div className="flex items-center gap-2">
              {option === "edit" ? (
                <>
                  <EditIcon size={20} />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </>
              ) : (
                <>
                  <Trash2 size={20} />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </>
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>

      {/* modals */}
      <EditJobModal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        jobId={editJobID}
      />

      <DeleteJobModal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        jobId={selectedJobId}
        onDelete={() => handleDeleteConfirm(selectedJobId)}
      />
    </>
  );
};

export default ApplicationBoard;
