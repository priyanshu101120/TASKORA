"use client";
import useAuthh from "@/hooks/useAuth";
import { EyeOff, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { login, signUp, loginWithGoogle } = useAuthh();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(name, email, password);
        setIsSignUp(false);
        alert("Account created successfully! Now you can login.");
        router.refresh();
        router.push("/boards");
      } else {
        await login(email, password);
        router.refresh();
        router.push("/boards");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#080d0b] flex items-center justify-center p-4 overflow-hidden font-[Inter,sans-serif]">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="pointer-events-none fixed -top-20 -right-16 w-105 h-105 z-0"
        style={{
          background: "radial-gradient(circle, #1a3d2b 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed -bottom-24 -left-20 w-95 h-95 z-0"
        style={{
          background: "radial-gradient(circle, #0f2d1c 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed top-[40%] left-[35%] w-70 h-70 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(180,230,160,0.04) 0%, transparent 65%)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/8 backdrop-blur-md px-7 py-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow:
            "0 1px 0 inset rgba(255,255,255,0.06), 0 24px 48px -12px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
        />

        <div className="mb-7 text-center">
          <h1
            className="text-2xl font-bold text-[#c8f0a0] tracking-tight mb-1"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Taskora
          </h1>
          <p className="text-[11px] text-white/30 tracking-widest uppercase">
            {isSignUp ? "Create your account" : "Welcome back"}
          </p>
        </div>

        <form onSubmit={handleSubmitForm} className="space-y-3">
          {isSignUp && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <User
                  size={14}
                  className="text-white/25 group-focus-within:text-[#c8f0a0]/60 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c8f0a0]/40 focus:bg-white/8 transition-all"
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail
                size={14}
                className="text-white/25 group-focus-within:text-[#c8f0a0]/60 transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c8f0a0]/40 focus:bg-white/8 transition-all"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock
                size={14}
                className="text-white/25 group-focus-within:text-[#c8f0a0]/60 transition-colors"
              />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-12 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c8f0a0]/40 focus:bg-white/8 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-white/25 hover:text-white/50 transition-colors"
            >
              {showPassword ? (
                <EyeOff size={14} />
              ) : (
                <span className="text-[9px] font-bold tracking-widest uppercase">
                  show
                </span>
              )}
            </button>
          </div>

          {errorMessage && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2">
              <p className="text-red-400 text-xs text-center">{errorMessage}</p>
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#c8f0a0] text-[#080d0b] font-bold py-2.5 rounded-xl hover:bg-[#b8e580] active:scale-[0.98] transition-all text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Please wait..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </div>

          <div className="flex items-center gap-3 py-1">
            <hr className="flex-1 border-white/8" />
            <span className="text-[10px] text-white/25 font-medium tracking-widest uppercase">
              or
            </span>
            <hr className="flex-1 border-white/8" />
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 border border-white/8 bg-white/4 rounded-xl py-2.5 px-4 hover:bg-white/8 hover:border-white/15 active:scale-[0.98] transition-all"
          >
            <svg viewBox="0 0 48 48" className="w-4 h-4 shrink-0">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <span className="text-xs font-medium text-white/40">
              {isSignUp ? "Sign up with Google" : "Continue with Google"}
            </span>
          </button>

          <p className="text-center text-xs text-white/30 pt-1">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage("");
              }}
              className="text-[#c8f0a0]/70 hover:text-[#c8f0a0] font-semibold transition-colors underline underline-offset-4"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
