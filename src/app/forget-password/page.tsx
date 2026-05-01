"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { forgotPassword, verifyResetCode, resetPassword } from "@/actions/auth.action";


type Step = 1 | 2 | 3;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSendCode() {
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    const res = await forgotPassword(email);
    setLoading(false);
    if (res.ok) {
      toast.success("Reset code sent to your email!");
      setStep(2);
    } else {
      toast.error(res.message || "Failed to send reset code");
    }
  }

  async function handleVerifyCode() {
    if (!code || code.length !== 6) return toast.error("Please enter the 6-digit code");
    setLoading(true);
    const res = await verifyResetCode(code);
    setLoading(false);
    if (res.ok) {
      toast.success("Code verified!");
      setStep(3);
    } else {
      toast.error(res.message || "Invalid or expired code");
    }
  }

  async function handleResetPassword() {
    if (!newPassword) return toast.error("Please enter a new password");
    if (newPassword !== confirmPassword) return toast.error("Passwords don't match");
    setLoading(true);
    const res = await resetPassword(email, newPassword);
    setLoading(false);
    if (res.ok) {
      toast.success("Password reset successfully!");
      router.push("/login");
    } else {
      toast.error(res.message || "Failed to reset password");
    }
  }

  const steps = [
    { icon: "flowbite:envelope-solid", label: "Email" },
    { icon: "mdi:key", label: "Verify" },
    { icon: "mdi:lock", label: "Reset" },
  ];

  return (
    <section className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-16 items-center">

        <div className="flex flex-col items-center text-center">
          <div className="w-full max-w-md mb-8 bg-green-50 rounded-3xl p-12 flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon icon="mdi:lock" className="text-green-600 text-5xl" />
              </div>
              <div className="absolute -top-3 -left-6 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Icon icon="flowbite:envelope-solid" className="text-green-500 text-2xl" />
              </div>
              <div className="absolute -top-3 -right-6 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Icon icon="mdi:shield-check" className="text-green-500 text-2xl" />
              </div>
              <div className="flex gap-2 mt-6 justify-center">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i === step - 1 ? "bg-green-600" : "bg-green-200"}`} />
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Reset Your Password</h2>
          <p className="text-lg text-gray-600 mb-4">
            Don't worry, it happens to the best of us. We'll help you get back into your account in no time.
          </p>
          <div className="flex gap-6 text-sm text-gray-700">
            <span className="flex items-center gap-1.5">
              <Icon icon="flowbite:envelope-solid" className="text-green-600 size-5" /> Email Verification
            </span>
            <span className="flex items-center gap-1.5">
              <Icon icon="mdi:shield-check" className="text-green-600 size-5" /> Secure Reset
            </span>
            <span className="flex items-center gap-1.5">
              <Icon icon="mdi:lock" className="text-green-600 size-5" /> Encrypted
            </span>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-lg shadow-lg p-12">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="mb-6">
              <span className="text-3xl font-extrabold text-green-700">Fresh
                <span className="text-3xl font-extrabold text-black">Cart</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 1 && "Forgot Password?"}
              {step === 2 && "Check Your Email"}
              {step === 3 && "Set New Password"}
            </h1>
            <p className="text-gray-600 text-center">
              {step === 1 && "No worries, we'll send you a reset code"}
              {step === 2 && `Enter the 6-digit code sent to ${email}`}
              {step === 3 && "Create a strong new password for your account"}
            </p>
          </div>

          <div className="flex items-center justify-center mb-8 gap-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                  ${step > i + 1 ? "bg-green-600 text-white" :
                    step === i + 1 ? "bg-green-600 text-white" :
                    "bg-gray-100 text-gray-400"}`}
                >
                  {step > i + 1
                    ? <Icon icon="mdi:check" className="text-xl" />
                    : <Icon icon={s.icon} className="text-xl" />
                  }
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-1 transition-all ${step > i + 1 ? "bg-green-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                <div className="relative">
                  <Icon icon="flowbite:envelope-solid" className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm"
                    onKeyDown={e => e.key === "Enter" && handleSendCode()}
                  />
                </div>
              </div>
              <button
                onClick={handleSendCode}
                disabled={loading}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-base rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70"
              >
                {loading ? <Icon icon="mdi:loading" className="animate-spin text-xl" /> : null}
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
              <Link href="/login" className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-green-600 transition">
                <Icon icon="mdi:arrow-left" /> Back to Sign In
              </Link>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Verification Code</label>
                <div className="relative">
                  <Icon icon="mdi:key" className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="• • • • • •"
                    maxLength={6}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm tracking-widest text-center text-lg font-semibold"
                    onKeyDown={e => e.key === "Enter" && handleVerifyCode()}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Didn't receive the code?{" "}
                  <button onClick={() => { handleSendCode(); }} className="text-green-600 font-medium hover:underline">
                    Resend Code
                  </button>
                </p>
              </div>
              <button
                onClick={handleVerifyCode}
                disabled={loading}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-base rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70"
              >
                {loading ? <Icon icon="mdi:loading" className="animate-spin text-xl" /> : null}
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-green-600 transition w-full"
              >
                <Icon icon="mdi:arrow-left" /> Change email address
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">New Password</label>
                <div className="relative">
                  <Icon icon="mdi:lock" className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon icon={showPass ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="size-5" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Confirm Password</label>
                <div className="relative">
                  <Icon icon="mdi:lock-check" className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm"
                    onKeyDown={e => e.key === "Enter" && handleResetPassword()}
                  />
                </div>
              </div>
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-base rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70"
              >
                {loading ? <Icon icon="mdi:loading" className="animate-spin text-xl" /> : null}
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-green-600 font-semibold hover:underline">
              Sign In
            </Link>
          </div>

          <div className="mt-4 flex justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icon icon="mdi:check-circle-outline" className="text-green-600 size-4" /> SSL Secured
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:shield-check" className="text-green-600 size-4" /> Secure Reset
            </span>
          </div>
        </div>
      </div>

    
    </section>
  );
}