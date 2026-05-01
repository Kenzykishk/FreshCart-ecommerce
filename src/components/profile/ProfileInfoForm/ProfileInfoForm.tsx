"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { updateProfile } from "@/actions/profile.action";
import { updateProfileSchema, UpdateProfilePayload } from "@/schema/settings.schema";

export default function ProfileInfoForm() {
  const { data: session } = useSession();

  const { handleSubmit, control, formState: { isSubmitting } } = useForm<UpdateProfilePayload>({
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
    },
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
  });

  async function onSubmit(formValues: UpdateProfilePayload) {
    const res = await updateProfile(formValues);
    if (res.ok) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error(res.message || "Update failed");
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
  
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
          <Icon icon="mdi:account-circle" className="text-green-600 text-xl" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Profile Information</h3>
          <p className="text-sm text-gray-500">Update your personal details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm text-gray-600 ">{`Full Name`}</label>
              <input
                {...field}
                placeholder="Enter your full name"
                autoComplete="off"
                className="w-full mt-2 border border-gray-200 bg-transparent px-2 py-3 text-sm text-gray-900 outline-none focus:border-green-500 transition-colors placeholder:text-gray-400"
              />
              {fieldState.error && (
                <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm text-gray-600 ">Email Address</label>
              <input
                {...field}
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                className="w-full mt-2 border border-gray-200 bg-transparent px-2 py-3 text-sm text-gray-900 outline-none focus:border-green-500 transition-colors placeholder:text-gray-400"
              />
              {fieldState.error && (
                <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <label className="text-sm text-gray-600 ">Phone Number</label>
              <input
                {...field}
                type="tel"
                placeholder="01xxxxxxxxx"
                autoComplete="off"
                className="w-full mt-2 border border-gray-200 bg-transparent px-2 py-3 text-sm text-gray-900 outline-none focus:border-green-500 transition-colors placeholder:text-gray-400"
              />
              {fieldState.error && (
                <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <Icon icon="mdi:content-save" className="size-4" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>

    
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Account Information</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center  border-gray-100">
            <span className="text-sm text-gray-500">User ID</span>
            <span className="text-sm text-gray-700 font-mono">
              {(session?.user as any)?._id || "69da636aba4b2c4c7e670d15"}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-500">Role</span>
            <span className="text-sm font-medium text-green-700">
              User
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}