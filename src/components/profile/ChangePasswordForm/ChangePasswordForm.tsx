"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { changePassword } from "@/actions/profile.action";
import { changePasswordSchema, ChangePasswordPayload } from "@/schema/settings.schema";

export default function ChangePasswordForm() {
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const { handleSubmit, control, reset } = useForm<ChangePasswordPayload>({
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  async function onSubmit(formValues: ChangePasswordPayload) {
    const res = await changePassword(formValues);
    if (res.ok) {
      toast.success("Password changed successfully!");
      reset();
    } else {
      toast.error(res.message || "Failed to change password");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mt-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-lg bg-amber-100 flex items-center justify-center">
          <Icon icon="uis:lock" className="text-orange-500 text-2xl" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">Change Password</h3>
          <p className="text-sm text-gray-500 font-medium">Update your account password</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          name="currentPassword"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              label="Current Password"
              placeholder="Enter your current password"
              show={showPasswords.current}
              onToggle={() => setShowPasswords((p) => ({ ...p, current: !p.current }))}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              label="New Password"
              placeholder="Enter your new password"
              hint="Must have uppercase, lowercase, number & special character"
              show={showPasswords.new}
              onToggle={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              label="Confirm New Password"
              placeholder="Confirm your new password"
              show={showPasswords.confirm}
              onToggle={() => setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))}
              error={fieldState.error?.message}
            />
          )}
        />

        <button
          type="submit"
          className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-orange-100"
        >
          <Icon icon="mdi:lock" className="text-lg" />
          Change Password
        </button>
      </form>
    </div>
  );
}

function PasswordInput({ label, hint, show, onToggle, error, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-md text-gray-700 ml-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...props}
          className="mt-3 w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-300 focus:bg-white outline-none transition-all"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
        >
          <Icon icon={show ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="text-xl" />
        </button>
      </div>
      {hint && <p className="text-[11px] text-gray-400 font-medium ml-1">{hint}</p>}
      {error && <p className="text-[11px] text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
}