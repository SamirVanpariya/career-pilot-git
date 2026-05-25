"use client";
import React, { useState } from "react";
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import DangerButton from "../atoms/buttons/DangerButton";
import { usePathname } from "next/navigation";
import { sidebarTopNavigation } from "@/utils/RoutesMapper";
import {
  AudioWaveform,
  ChartPie,
  FileUser,
  LayoutDashboard,
  LogOut,
  Settings,
  Video,
} from "lucide-react";

const RocketLogo = () => (
  <svg
    className="w-6 h-6 text-white transform -rotate-45"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.536 8.464a5 5 0 010 7.072L13 18.072v-3.657l-2.414-2.414H6.928l2.536-2.536a5 5 0 017.072 0z"
    />
  </svg>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const topMenuItems = [
    {
      text: "Dashboard",
      path: sidebarTopNavigation[0].path,
      icon: <LayoutDashboard />,
    },
    {
      text: "Resume Analysis",
      path: sidebarTopNavigation[1].path,
      icon: <FileUser />,
    },
    {
      text: "Job Tracker",
      path: sidebarTopNavigation[2].path,
      icon: <AudioWaveform />,
      active: true,
    },
    {
      text: "Interviews",
      path: sidebarTopNavigation[3].path,
      icon: <Video />,
    },
    {
      text: "Analytics",
      path: sidebarTopNavigation[4].path,
      icon: <ChartPie />,
    },
    {
      text: "Settings",
      path: sidebarTopNavigation[5].path,
      icon: <Settings />,
    },
  ];
  const pathname = usePathname();
  console.log("Current Path:", pathname);

  const bottomMenuItems = [
    // { text: "Help Center", icon: <HelpIcon /> },
    { text: "Logout", path: "/logout", icon: <LogOut />, isLogout: true },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            color: "white",
            backgroundColor: "#1E1E1E",
            "&:hover": {
              backgroundColor: "#2A2A2A",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`h-screen bg-[#121212] border-r border-[#1F1F1F] flex flex-col p-4 transition-all duration-300 z-50
          ${mobileOpen ? "fixed top-0 left-0 translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${collapsed ? "w-20" : "w-64"}
          ${isMobile ? "fixed" : ""}
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } mb-6`}
        >
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-[44px] h-[44px] rounded-xl bg-gradient-to-br from-[#8A67FA] to-[#5C30E1] flex items-center justify-center">
                <RocketLogo />
              </div>

              <div>
                <h1 className="text-white font-bold text-lg">CareerPilot</h1>

                <p className="text-xs text-[#737373]">AI Career Intelligence</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Desktop Collapse Button */}
            <div className="hidden md:block">
              <IconButton
                onClick={() => setCollapsed(!collapsed)}
                sx={{
                  color: "white",
                  backgroundColor: "#1E1E1E",
                  "&:hover": {
                    backgroundColor: "#2A2A2A",
                  },
                }}
              >
                {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
              </IconButton>
            </div>

            {/* Mobile Close Button */}
            <div className="md:hidden">
              <IconButton
                onClick={() => setMobileOpen(false)}
                sx={{
                  color: "white",
                  backgroundColor: "#1E1E1E",
                  "&:hover": {
                    backgroundColor: "#2A2A2A",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-2 overflow-y-auto py-2">
          {topMenuItems.map((item, index) => {
            const active = pathname === item.path;
            return (
              <Tooltip
                key={index}
                title={collapsed ? item.text : ""}
                placement="right"
                onClick={isMobile ? () => setMobileOpen(false) : undefined}
              >
                <Link
                  href={item?.path}
                  className={`group flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } h-[40px] rounded-[5px] px-3 transition-all duration-200
          ${
            active
              ? "bg-[var(--color-secondary)] text-white"
              : "text-white hover:bg-[#ffffff13] hover:text-white"
          }`}
                >
                  <span className={active ? "brightness-0 invert" : ""}>
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span
                      className={`text-[16px] font-[600] ${
                        active ? "!text-white" : "text-[#A1A1AA]"
                      }`}
                    >
                      {item.text}
                    </span>
                  )}
                </Link>
              </Tooltip>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="space-y-4">
          {!collapsed && (
            <button className="w-full h-[44px] rounded-xl bg-[#CDD1FF] text-[#5C30E1] font-bold text-sm hover:bg-[#BCC1FF] transition">
              Optimize Resume
            </button>
          )}

          <nav className="space-y-2">
            {bottomMenuItems.map((item, index) => (
              <Tooltip
                key={index}
                title={collapsed ? item.text : ""}
                placement="right"
              >
                <DangerButton
                  onClick={() => console.log(`${item.text} clicked`)}
                  className="!w-full"
                >
                  <span>{item.icon}</span>

                  {!collapsed && (
                    <span className="!text-white text-[16px] font-[600]">
                      {item.text}
                    </span>
                  )}
                </DangerButton>
              </Tooltip>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
