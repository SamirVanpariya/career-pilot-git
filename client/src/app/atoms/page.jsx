"use client";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import Secondary from "@/components/atoms/buttons/SecondaryButton";
import Input from "@/components/atoms/input/Input";
import { Lock } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({ password: "" });
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
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
        <Secondary onClick={() => console.log("Secondary clicked")}>
          Secondary Action
        </Secondary>
        <Secondary disabled>Disabled</Secondary>
      </div>
    </div>
  );
};

export default page;
