"use client";

import * as React from "react";
import { useState } from "react";

import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DeleteIcon, DollarSign, EditIcon, MapPin } from "lucide-react";

import CardWrp from "./CardWrp";
import Select from "./atoms/select/Select";
import Textarea from "./atoms/textarea/Textarea";
import EditJobModal from "./EditJobModal";

const options = ["edit", "delete"];
const ITEM_HEIGHT = 48;

const ApplicationBoard = ({ columns, jobs: initialJobs, priorityStyles }) => {
  const STATUS = ["applied", "interview", "offer", "rejected"];

  const [jobs, setJobs] = useState(initialJobs || []);
  const [openNoteJobId, setOpenNoteJobId] = useState(null);

  const [editJobID, setEditJobID] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const open = Boolean(anchorEl);

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
    setOpenNoteJobId((prev) => (prev === jobId ? null : jobId));
  };

  // note change
  const handleNoteChange = (jobId, value) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              notes: value,
            }
          : job,
      ),
    );
  };

  // note save
  const handleSaveNote = () => {
    setOpenNoteJobId(null);
  };

  // menu open
  const handleClick = (event, jobId) => {
    setAnchorEl(event.currentTarget);
    setSelectedJobId(jobId);
  };

  // menu close
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedJobId(null);
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
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    handleClose();
  };

  return (
    <>
      <CardWrp>
        <h2 className="text-lg font-bold text-white mb-5">
          Application Board - (Kanban view)
        </h2>

        <Grid container spacing={3}>
          {columns.map((col) => {
            const ColIcon = col.icon;

            const colJobs = jobs.filter((job) => job.status === col.id);

            return (
              <Grid key={col.id} size={{ xs: 12, sm: 6, xl: 3 }}>
                <div className="flex flex-col gap-3">
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
                  <div className="flex flex-col gap-4 min-h-[120px]">
                    {colJobs.map((job) => {
                      return (
                        <div
                          key={job.id}
                          className="glass-card rounded-xl p-4 flex flex-col gap-3 hover:border-orange-500/25 hover:translate-y-[-1px] transition-all duration-200 cursor-pointer"
                        >
                          {/* top section */}
                          <div className="flex items-start justify-between gap-2">
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
                          <p className="text-zinc-300 text-xs leading-relaxed">
                            {job.role}
                          </p>

                          {/* location + salary */}
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                              <MapPin className="w-3 h-3 shrink-0" />

                              <span className="truncate">{job.location}</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                              <DollarSign className="w-3 h-3 shrink-0" />

                              <span>{job.salary}</span>
                            </div>
                          </div>

                          {/* date */}
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-zinc-600 text-xs">
                              Applied {job.date}
                            </span>
                          </div>

                          {/* notes */}
                          {openNoteJobId === job.id ? (
                            <>
                              <Textarea
                                name="notes"
                                value={job.notes || ""}
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
                            <button
                              onClick={() => handleAddNote(job.id)}
                              className="px-4 py-2 border border-dashed border-white/30 hover:border-orange-500/50 cursor-pointer w-full rounded-full text-white text-xs font-bold transition-colors duration-200"
                            >
                              Add Note
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
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
                  <DeleteIcon size={20} />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </>
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>

      {/* edit modal */}
      <EditJobModal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        jobId={editJobID}
      />
    </>
  );
};

export default ApplicationBoard;
