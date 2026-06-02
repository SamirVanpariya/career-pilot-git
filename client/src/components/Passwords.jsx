"use client";

import PrimaryButton from "./atoms/buttons/PrimaryButton";
import CardWrp from "./CardWrp";

const Passwords = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <CardWrp className="mt-0">
          <h2 className="text-base font-bold text-white mb-5">
            Change Password
          </h2>
          <div className="flex flex-col gap-4 max-w-md">
            {["Current Password", "New Password", "Confirm New Password"].map(
              (label) => (
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
              ),
            )}
            <div className="pt-1">
              <PrimaryButton href="#">Update Password</PrimaryButton>
            </div>
          </div>
        </CardWrp>
      </div>
    </>
  );
};

export default Passwords;
