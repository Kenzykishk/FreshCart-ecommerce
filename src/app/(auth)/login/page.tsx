"use client";
import { loginPayloadType, loginSchema, defaultValues } from '@/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import { Icon } from '@iconify/react'; 
import cart from"@/assets/images/cart.png"
import Image from 'next/image';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  const router = useRouter()

  const { handleSubmit, control, formState: { isSubmitting } } = useForm<loginPayloadType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  async function onSubmit(formValues: loginPayloadType) {
    const resp = await signIn("credentials", { ...formValues, redirect: false, callbackUrl: "/" })

    if (resp?.ok) {
      toast.success("Welcome Back")
      router.push("/")
    } else {
      toast.error(resp?.error || "Login failed",{
        autoClose: 2000, 
  hideProgressBar: false,
      }); 
    }
  }

  return (
    <section className='py-12  min-h-screen'>
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-16 items-center 
        ">

        <div className="flex flex-col items-center text-center">
            <Image
            src={cart} 
            alt="FreshCart shopping cart"
            className="w-full max-w-md mb-8 rounded-3xl shadow-xl"
            width={616}
            height={384}
          />
          
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-lg text-gray-600 mb-4">Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
          <div className="flex gap-6 text-sm text-gray-700">
            <span className="flex items-center gap-1.5"><Icon icon="mdi:truck" className="text-green-600 size-5" /> Free Delivery</span>
            <span className="flex items-center gap-1.5"><Icon icon="fa7-solid:shield-halved" className="text-green-600 size-5" /> Secure Payment</span>
            <span className="flex items-center gap-1.5"><Icon icon="mdi:clock" className="text-green-600 size-5" /> 24/7 Support</span>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-lg shadow-lg p-12">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="mb-6 flex items-center gap-2">
              <span className="text-3xl font-extrabold text-green-700">Fresh
                 <span className="text-3xl font-extrabold text-black">Cart</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to continue your fresh shopping experience</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full font-medium justify-center gap-3 h-12 text-gray-700">
                <Icon icon="fe:google" className="size-5 text-red-600" />
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full  font-medium justify-center gap-3 h-12 text-gray-700">
                <Icon icon="logos:facebook" className="size-5" />
                Continue with Facebook
              </Button>
            </div>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
<span className="px-4 bg-white text-gray-500 font-medium">OR CONTINUE WITH EMAIL</span>             
 <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-md font-medium">Email Address</FieldLabel>
                    <div className="relative">
                      <Icon icon="flowbite:envelope-solid" className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="off"
                        className="pl-11 h-12"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center mb-1.5">
                      <FieldLabel htmlFor={field.name} className="text-md font-medium m-0">Password</FieldLabel>
                      <Link href="/forget-password" className="text-sm text-green-600 hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Icon icon="material-symbols:lock-sharp" className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your Password"
                        autoComplete="off"
                        type='password'
                        className="pl-11 h-12" 
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <Icon icon="mdi:eye-outline" className="size-5" />
                      </button>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="keepSignedIn" className="size-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <label htmlFor="keepSignedIn" className="text-sm text-gray-700">
                  Keep me signed in
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-base"
                disabled={isSubmitting} 
              >
              {isSubmitting ? (
    <>
      <Icon icon="lucide:loader-2" className="size-5 animate-spin" />
      <span>Signing In...</span>
    </>
  ) : (
    "Sign In"
  )}
              </Button>

            </FieldGroup>
          </form>

          <div className="mt-8 text-center text-md text-gray-600">
            New to FreshCart?{' '}
            <Link href="/register" className="text-green-600 font-semibold hover:underline">
              Create an account
            </Link>
          </div>

          <div className="mt-6 flex justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Icon icon="mdi:check-circle-outline" className="text-green-600 size-4" /> SSL Secured</span>
            <span>50K+ Users</span>
            <span className="flex items-center gap-1 text-gray-800 font-medium"><Icon icon="mdi:star" className="text-yellow-400 size-4" /> 4.9 Rating</span>
          </div>

        </div>
      </div>
    </section>
  )
}

