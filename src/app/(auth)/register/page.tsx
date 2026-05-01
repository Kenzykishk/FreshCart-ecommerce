"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { RegisterPayloadType, registerSchema, defaultValues } from '@/schema/register.schema';
import { registerHandler } from "@/actions/auth.action";
import { Icon } from '@iconify/react';
import Link from 'next/link';
import women from "@/assets/images/women.png";
import Image from 'next/image';
import FeaturesData from '@/components/Shared/FeaturesData/FeaturesData';
import { footerFeaturesData } from '@/constants/features';
import { signIn } from "next-auth/react";

const socialButtons = [
  { icon: "gg:google", label: "Google", provider: "google" },
  { icon: "logos:facebook", label: "Facebook", provider: "facebook" },
];

const leftFeatures = [
  { icon: "ic:round-star", title: "Premium Quality", desc: "Premium quality products sourced from trusted suppliers." },
  { icon: "fa7-solid:truck-fast", title: "Fast Delivery", desc: "Same-day delivery available in most areas." },
  { icon: "fa7-solid:shield-halved", title: "Secure Shopping", desc: "Your data and payments are completely secure." },
];

const formFields = [
  { name: "name",       label: "Name",            placeholder: "Ali",                   type: "text" },
  { name: "email",      label: "Email",           placeholder: "ali@example.com",        type: "email" },
  { name: "password",   label: "Password",        placeholder: "create a strong password", type: "password" },
  { name: "rePassword", label: "Confirm Password", placeholder: "confirm your password",   type: "password" },
  { name: "phone",      label: "Phone Number",    placeholder: "+1 234 567 8900",        type: "tel" },
] as const;

export default function RegisterPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const { handleSubmit, control, formState: { isSubmitting } } = useForm<RegisterPayloadType>({
    defaultValues,
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  async function onSubmit(formValues: RegisterPayloadType) {
    console.log("onSubmit fired", formValues);
    if (!agreed) { 
      toast.error("You must accept the terms and conditions"); 
      return; 
    }
    const res = await registerHandler(formValues);
    if (res.ok) {
      toast.success("Account has been registered successfully");
      router.push("/login");
    } else {
      toast.error(res.error.message || "Registration failed");
    }
  }

  return (
    <>
    <section className="flex items-center justify-center py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start rounded-[2.5rem] p-8 lg:p-16">

        <div className="space-y-10 px-6 col-span-1">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-700 leading-tight">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-xl mt-2 mb-4">Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
          </div>

          <div className="space-y-6">
            {leftFeatures.map((f) => (
              <div key={f.title} className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center shrink-0 border border-green-100/50">
                  <Icon icon={f.icon} className="text-2xl text-green-700 size-7" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{f.title}</p>
                  <p className="text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 border shadow-sm border-gray-100 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-full bg-green-200 overflow-hidden ring-4 ring-white shadow-sm">
                <Image alt='womenphoto' src={women} width={50} height={50} className='rounded-full' />
              </div>
              <div>
                <p className="font-bold text-gray-900">Sarah Johnson</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <Icon key={i} icon="material-symbols:star" className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed italic">
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </p>
          </div>
        </div>

        <div className="w-full col-span-1 ml-auto shadow-lg bg-white rounded-lg py-10 px-6">
          <div className="mb-8 flex justify-center flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-700">Create Your Account</h2>
            <p className="mt-2 text-gray-700 text-md">Start your fresh journey with us today</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {socialButtons.map((btn) => (
              <Button
                key={btn.label}
                type="button"
                variant="outline"
                onClick={() => signIn(btn.provider, { callbackUrl: "/" })}
                className="h-12 rounded-xl border-gray-200 gap-2 font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Icon icon={btn.icon} className="text-xl" />
                {btn.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-gray-100" />
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">or continue with email</span>
            <hr className="flex-1 border-gray-100" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {formFields.map(({ name, label, placeholder, type }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      {label}<span className="text-red-500">*</span>
                    </label>
                    <Input
                      {...field}
                      type={type}
                      placeholder={placeholder}
                      className={`h-12 rounded-xl border-gray-200 transition-all duration-200 
                        ${fieldState.invalid 
                          ? "border-red-400 focus-visible:ring-red-400" 
                          : "focus-visible:border-green-500 focus-visible:ring-green-500/20"
                        }`}
                    />
                    {fieldState.invalid && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{fieldState.error?.message}</p>
                    )}
                  </div>
                )}
              />
            ))}

            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(!!v)}
                className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 rounded-md"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                I agree to the <span className="text-green-600 font-semibold underline">Terms of Service</span> and <span className="text-green-600 font-semibold underline">Privacy Policy</span> *
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-base transition-all shadow-lg shadow-green-200 flex gap-2"
            >
              {isSubmitting ? (
                <Icon icon="line-md:loading-loop" className="size-6" />
              ) : (
                <>
                  <Icon icon="mdi:user-plus" className="text-xl size-7" />
                  Create My Account
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
      </div>
    </section>
    <FeaturesData featuresData={footerFeaturesData} isFooter={true}/>
    </>
  );
}