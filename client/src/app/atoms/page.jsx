"use client";
import DangerButton from "@/components/atoms/buttons/DangerButton";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import Colors from "@/components/atoms/colors/Colors";
import Input from "@/components/atoms/input/Input";
import { Lock } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({ password: "" });
  return (
    <div className="p-5 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Input
        type="text"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Enter password"
        icon={<Lock size={16} />}
        className="mb-4 !w-[250px]"
      />
      <br />
      <div className="flex gap-4 mb-4">
        <PrimaryButton onClick={() => console.log(formData)}>
          Create Account
        </PrimaryButton>
        <PrimaryButton disabled>Submit</PrimaryButton>
        <PrimaryButton loading>Processing</PrimaryButton>
        <PrimaryButton href="/login">Go to Login</PrimaryButton>
      </div>
      <div className="flex gap-4 mb-4">
        <SecondaryButton onClick={() => console.log("Secondary clicked")}>
          Secondary Action
        </SecondaryButton>
        <SecondaryButton disabled>Disabled</SecondaryButton>
      </div>
      <div className="flex gap-4 mb-4">
        <DangerButton onClick={() => console.log("Danger clicked")}>
          Delete Account
        </DangerButton>
      </div>
      <div className="flex gap-4">
        <Colors />
      </div>
    </div>
  );
};

export default page;
