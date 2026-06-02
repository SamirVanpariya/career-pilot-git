"use client";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import SecondaryButton from "./atoms/buttons/SecondaryButton";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import { useState } from "react";
import { Briefcase, Globe, Mail, MapPin, Phone, User } from "lucide-react";

const PersonalInfo = ({ icon }) => {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };
  return (
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
                      (e.target.style.borderColor = "rgba(255,87,34,0.50)")
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

      <div className="flex justify-end gap-3 mt-5">
        <SecondaryButton>Cancel</SecondaryButton>
        <PrimaryButton onClick={toggleEdit}>
          {isEditable ? "Save Changes" : "Edit"}
        </PrimaryButton>
      </div>
    </CardWrp>
  );
};

export default PersonalInfo;
