"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  User,
  Bell,
  Shield,
  Palette,
  Link2,
  Trash2,
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  GitBranch,
  ExternalLink,
  ChevronRight,
  Check,
} from "lucide-react";
import CardWrp from "@/components/CardWrp";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

/* ─── Sidebar Tabs ───────────────────────────────────────────── */
const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Link2 },
];

/* ─── Notification Toggles ───────────────────────────────────── */
const notificationGroups = [
  {
    group: "Applications",
    items: [
      {
        label: "Application status updates",
        description: "When a company changes your application status",
        defaultOn: true,
      },
      {
        label: "New job matches",
        description: "AI-matched roles based on your profile",
        defaultOn: true,
      },
      {
        label: "Application reminders",
        description: "Follow-up reminders for pending applications",
        defaultOn: false,
      },
    ],
  },
  {
    group: "Interviews",
    items: [
      {
        label: "Interview scheduled",
        description: "When a new interview is booked",
        defaultOn: true,
      },
      {
        label: "Interview reminders",
        description: "24h and 1h before each interview",
        defaultOn: true,
      },
      {
        label: "Feedback received",
        description: "When interview feedback is available",
        defaultOn: true,
      },
    ],
  },
  {
    group: "Platform",
    items: [
      {
        label: "Weekly career digest",
        description: "Summary of your career progress every Monday",
        defaultOn: false,
      },
      {
        label: "Product updates",
        description: "New features and improvements",
        defaultOn: false,
      },
    ],
  },
];

/* ─── Integrations ───────────────────────────────────────────── */
const integrations = [
  {
    name: "GitHub",
    description: "Showcase your repositories and contributions",
    icon: GitBranch,
    connected: true,
    color: "text-zinc-300",
    bg: "bg-zinc-500/10",
  },
  {
    name: "LinkedIn",
    description: "Sync your profile and import work history",
    icon: ExternalLink,
    connected: false,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    name: "Google Calendar",
    description: "Sync interview schedules automatically",
    icon: Globe,
    connected: true,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

/* ─── Accent Colours ─────────────────────────────────────────── */
const accentColors = [
  { label: "Orange", value: "bg-orange-500" },
  { label: "Amber", value: "bg-amber-500" },
  { label: "Red", value: "bg-red-500" },
  { label: "Emerald", value: "bg-emerald-500" },
  { label: "Sky", value: "bg-sky-500" },
  { label: "Zinc", value: "bg-zinc-500" },
];

/* ─── Toggle Component ───────────────────────────────────────── */
function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0 ${
        on ? "bg-orange-500" : "bg-zinc-700"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedAccent, setSelectedAccent] = useState("bg-orange-500");
  return (
    <Grid container spacing={3} className="items-start">
      {/* ── Left Nav ── */}
      <Grid size={{ xs: 12, md: 3 }}>
        <div className="glass-card rounded-[15px] p-2 flex flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left ${
                  active
                    ? "bg-orange-500/15 text-orange-300 border border-orange-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}

          {/* Danger zone */}
          <div className="mt-2 pt-2 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-400/10 transition-all duration-200">
              <Trash2 className="w-4 h-4 shrink-0" />
              Delete Account
            </button>
          </div>
        </div>
      </Grid>

      {/* ── Right Panel ── */}
      <Grid size={{ xs: 12, md: 9 }}>
        {/* ── PROFILE ── */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-6">
            {/* Avatar */}
            <CardWrp className="mt-0">
              <h2 className="text-base font-bold text-white mb-5">
                Profile Photo
              </h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl border flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,87,34,0.35), rgba(255,112,67,0.25))",
                      borderColor: "rgba(255,87,34,0.25)",
                    }}
                  >
                    <span className="text-white text-3xl font-black">A</span>
                  </div>
                  <button
                    className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg flex items-center justify-center hover:opacity-80 transition-colors"
                    style={{ background: "var(--color-orange)" }}
                  >
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Alex Johnson
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">
                    JPG, PNG or GIF · Max 2 MB
                  </p>
                  <div className="flex gap-2 mt-3">
                    <SecondaryButton href="#">Upload Photo</SecondaryButton>
                  </div>
                </div>
              </div>
            </CardWrp>

            {/* Personal Info */}
            <CardWrp className="mt-0">
              <h2 className="text-base font-bold text-white mb-5">
                Personal Information
              </h2>
              <Grid container spacing={3}>
                {[
                  {
                    label: "Full Name",
                    placeholder: "Alex Johnson",
                    icon: User,
                  },
                  {
                    label: "Email Address",
                    placeholder: "alex@example.com",
                    icon: Mail,
                  },
                  {
                    label: "Phone Number",
                    placeholder: "+1 (555) 000-0000",
                    icon: Phone,
                  },
                  {
                    label: "Location",
                    placeholder: "San Francisco, CA",
                    icon: MapPin,
                  },
                  {
                    label: "Job Title",
                    placeholder: "Senior Frontend Engineer",
                    icon: Briefcase,
                  },
                  {
                    label: "Website",
                    placeholder: "https://alexjohnson.dev",
                    icon: Globe,
                  },
                ].map((field) => {
                  const Icon = field.icon;
                  return (
                    <Grid key={field.label} size={{ xs: 12, sm: 6 }}>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                          {field.label}
                        </span>
                        <div className="relative">
                          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            defaultValue={field.placeholder}
                            className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-600 focus:outline-none focus:bg-white/[0.06] transition-all"
                            onFocus={(e) =>
                              (e.target.style.borderColor =
                                "rgba(255,87,34,0.50)")
                            }
                            onBlur={(e) => (e.target.style.borderColor = "")}
                          />
                        </div>
                      </label>
                    </Grid>
                  );
                })}

                {/* Bio — full width */}
                <Grid size={{ xs: 12 }}>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                      Bio
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Tell recruiters about yourself..."
                      defaultValue="Passionate frontend engineer with 6+ years building scalable web applications. Specialising in React, TypeScript, and design systems."
                      className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-600 focus:outline-none focus:bg-white/[0.06] transition-all resize-none"
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(255,87,34,0.50)")
                      }
                      onBlur={(e) => (e.target.style.borderColor = "")}
                    />
                  </label>
                </Grid>
              </Grid>

              <div className="flex justify-end mt-5">
                <PrimaryButton href="#">Save Changes</PrimaryButton>
              </div>
            </CardWrp>
          </div>
        )}

        {/* ── NOTIFICATIONS ── */}
        {activeTab === "notifications" && (
          <CardWrp className="mt-0">
            <h2 className="text-base font-bold text-white mb-6">
              Notification Preferences
            </h2>
            <div className="flex flex-col gap-8">
              {notificationGroups.map((group) => (
                <div key={group.group}>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
                    {group.group}
                  </p>
                  <div className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                      >
                        <div>
                          <p className="text-white text-sm font-semibold">
                            {item.label}
                          </p>
                          <p className="text-zinc-500 text-xs mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <Toggle defaultOn={item.defaultOn} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <PrimaryButton href="#">Save Preferences</PrimaryButton>
            </div>
          </CardWrp>
        )}

        {/* ── SECURITY ── */}
        {activeTab === "security" && (
          <div className="flex flex-col gap-6">
            <CardWrp className="mt-0">
              <h2 className="text-base font-bold text-white mb-5">
                Change Password
              </h2>
              <div className="flex flex-col gap-4 max-w-md">
                {[
                  "Current Password",
                  "New Password",
                  "Confirm New Password",
                ].map((label) => (
                  <label key={label} className="flex flex-col gap-1.5">
                    <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                      {label}
                    </span>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full h-10 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-600 focus:outline-none focus:bg-white/[0.06] transition-all"
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(255,87,34,0.50)")
                      }
                      onBlur={(e) => (e.target.style.borderColor = "")}
                    />
                  </label>
                ))}
                <div className="pt-1">
                  <PrimaryButton href="#">Update Password</PrimaryButton>
                </div>
              </div>
            </CardWrp>

            <CardWrp className="mt-0">
              <h2 className="text-base font-bold text-white mb-2">
                Two-Factor Authentication
              </h2>
              <p className="text-zinc-500 text-sm mb-5">
                Add an extra layer of security to your account.
              </p>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Authenticator App
                    </p>
                    <p className="text-zinc-500 text-xs mt-0.5">
                      Not configured
                    </p>
                  </div>
                </div>
                <SecondaryButton href="#">Enable</SecondaryButton>
              </div>
            </CardWrp>

            <CardWrp className="mt-0">
              <h2 className="text-base font-bold text-white mb-2">
                Active Sessions
              </h2>
              <p className="text-zinc-500 text-sm mb-5">
                Devices currently signed in to your account.
              </p>
              {[
                {
                  device: "MacBook Pro · Chrome",
                  location: "San Francisco, CA",
                  time: "Active now",
                  current: true,
                },
                {
                  device: "iPhone 15 · Safari",
                  location: "San Francisco, CA",
                  time: "2 hours ago",
                  current: false,
                },
              ].map((session, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] mb-2 last:mb-0"
                >
                  <div>
                    <p className="text-white text-sm font-semibold flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-zinc-500 text-xs mt-0.5">
                      {session.location} · {session.time}
                    </p>
                  </div>
                  {!session.current && (
                    <button className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </CardWrp>
          </div>
        )}

        {/* ── APPEARANCE ── */}
        {activeTab === "appearance" && (
          <div className="flex flex-col gap-6">
            <CardWrp className="mt-0">
              <h2 className="text-base font-bold text-white mb-5">Theme</h2>
              <Grid container spacing={2}>
                {[
                  { label: "Dark", desc: "Default dark theme", active: true },
                  {
                    label: "Darker",
                    desc: "Pure black background",
                    active: false,
                  },
                  {
                    label: "System",
                    desc: "Follows OS preference",
                    active: false,
                  },
                ].map((theme) => (
                  <Grid key={theme.label} size={{ xs: 12, sm: 4 }}>
                    <button
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        theme.active
                          ? "border-white/[0.06] bg-white/[0.02]"
                          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                      }`}
                      style={
                        theme.active
                          ? {
                              borderColor: "rgba(255,87,34,0.40)",
                              background: "rgba(255,87,34,0.08)",
                            }
                          : {}
                      }
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white text-sm font-semibold">
                          {theme.label}
                        </p>
                        {theme.active && (
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: "var(--color-orange)" }}
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-zinc-500 text-xs">{theme.desc}</p>
                    </button>
                  </Grid>
                ))}
              </Grid>
            </CardWrp>

            <CardWrp className="mt-0">
              <h2 className="text-base font-bold text-white mb-2">
                Accent Colour
              </h2>
              <p className="text-zinc-500 text-sm mb-5">
                Personalise the highlight colour across the dashboard.
              </p>
              <div className="flex flex-wrap gap-3">
                {accentColors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedAccent(c.value)}
                    className={`w-9 h-9 rounded-xl ${c.value} flex items-center justify-center transition-all hover:scale-110 ${
                      selectedAccent === c.value
                        ? "ring-2 ring-white/40 ring-offset-2 ring-offset-[#161618] scale-110"
                        : ""
                    }`}
                    title={c.label}
                  >
                    {selectedAccent === c.value && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </CardWrp>

            <CardWrp className="mt-0">
              <h2 className="text-base font-bold text-white mb-5">
                Display Preferences
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  {
                    label: "Compact sidebar",
                    description: "Show icons only in the sidebar by default",
                  },
                  {
                    label: "Animated gradients",
                    description: "Enable gradient animations across the UI",
                  },
                  {
                    label: "Reduce motion",
                    description: "Minimise animations for accessibility",
                  },
                ].map((pref) => (
                  <div
                    key={pref.label}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02]"
                  >
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {pref.label}
                      </p>
                      <p className="text-zinc-500 text-xs mt-0.5">
                        {pref.description}
                      </p>
                    </div>
                    <Toggle />
                  </div>
                ))}
              </div>
            </CardWrp>
          </div>
        )}

        {/* ── INTEGRATIONS ── */}
        {activeTab === "integrations" && (
          <CardWrp className="mt-0">
            <h2 className="text-base font-bold text-white mb-2">
              Connected Apps
            </h2>
            <p className="text-zinc-500 text-sm mb-6">
              Link external services to enhance your CareerPilot experience.
            </p>
            <div className="flex flex-col gap-3">
              {integrations.map((int) => {
                const Icon = int.icon;
                return (
                  <div
                    key={int.name}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${int.bg} flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${int.color}`} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">
                          {int.name}
                        </p>
                        <p className="text-zinc-500 text-xs mt-0.5">
                          {int.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {int.connected ? (
                        <>
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" /> Connected
                          </span>
                          <button className="text-xs text-zinc-500 hover:text-red-400 font-semibold transition-colors">
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <SecondaryButton href="#">Connect</SecondaryButton>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardWrp>
        )}
      </Grid>
    </Grid>
  );
};

export default SettingsTabs;
