import { Camera } from "lucide-react";
import SecondaryButton from "./atoms/buttons/SecondaryButton";
import CardWrp from "./CardWrp";

const ProfileAvatar = () => {
  return (
    <>
      <CardWrp className="mt-0">
        <h2 className="text-base font-bold text-white mb-5">Profile Photo</h2>
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
            <p className="text-white font-semibold text-sm">Alex Johnson</p>
            <p className="text-[var(--color-text-secondary)] text-xs mt-1">
              JPG, PNG or GIF · Max 2 MB
            </p>
            <div className="flex gap-2 mt-3">
              <SecondaryButton href="#">Upload Photo</SecondaryButton>
            </div>
          </div>
        </div>
      </CardWrp>
    </>
  );
};

export default ProfileAvatar;
