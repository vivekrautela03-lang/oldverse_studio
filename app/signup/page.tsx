"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration success
    alert("Successfully registered (mock)!");
  };

  return (
    <div className="min-h-screen flex bg-brand-black text-brand-ivory font-sans">
      {/* Left side: Cinematic Brand Banner (Hidden on Mobile) */}
      <div 
        className="hidden md:flex md:w-[42%] relative flex-col justify-between p-12 bg-cover bg-center select-none"
        style={{ backgroundImage: "linear-gradient(to right, rgba(11,11,11,0.2), rgba(11,11,11,0.9)), url('/frames/frame_0800.jpg')" }}
      >
        <div className="absolute inset-0 bg-brand-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/40" />

        {/* Brand Header */}
        <Link href="/home" className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-brand-graphite/40">
            <svg className="h-6 w-6 text-brand-gold" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="7" />
              <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="4" />
              <path d="M50 38 L55 50 L50 62 L45 50 Z" fill="currentColor" />
              <circle cx="50" cy="22" r="4" fill="currentColor" />
              <circle cx="70" cy="30" r="4" fill="currentColor" />
              <circle cx="78" cy="50" r="4" fill="currentColor" />
              <circle cx="70" cy="70" r="4" fill="currentColor" />
              <circle cx="50" cy="78" r="4" fill="currentColor" />
              <circle cx="30" cy="70" r="4" fill="currentColor" />
              <circle cx="22" cy="50" r="4" fill="currentColor" />
              <circle cx="30" cy="30" r="4" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h2 className="font-bebas text-2xl tracking-wider text-brand-ivory leading-none">THE OLDVERSE</h2>
            <p className="text-[0.55rem] font-space uppercase tracking-[0.25em] text-brand-gold mt-1">
              Every Story Deserves A Stage.
            </p>
          </div>
        </Link>

        {/* Core Tagline Overlay */}
        <div className="relative z-10 max-w-sm mt-auto mb-10">
          <h1 className="font-bebas text-5xl tracking-wider text-brand-ivory leading-tight drop-shadow-lg">
            THE <br/>OLDVERSE
          </h1>
          <p className="font-space text-xs text-brand-gold uppercase tracking-[0.3em] mt-3">
            Every Story Deserves A Stage.
          </p>
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div className="w-full md:w-[58%] flex items-center justify-center px-6 py-12 bg-brand-black">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-bebas text-4xl tracking-wider text-brand-ivory">Create Your Account</h2>
            <p className="mt-1.5 font-sans text-sm text-brand-ivory/60 font-light">
              Join thousands of creators and storytellers
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
            <button
              onClick={() => alert("Continue with Google (mock)")}
              className="flex items-center justify-center gap-3 border border-white/10 bg-brand-graphite hover:bg-brand-slate py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google
            </button>
            <button
              onClick={() => alert("Continue with Apple (mock)")}
              className="flex items-center justify-center gap-3 border border-white/10 bg-brand-graphite hover:bg-brand-slate py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.82M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.73-1.2 1.88-1.05 2.99 1.12.09 2.27-.57 3-1.44z" />
              </svg>
              Apple
            </button>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <span className="absolute inset-x-0 h-px bg-white/10"></span>
            <span className="relative px-4 text-xs font-space uppercase tracking-widest text-brand-ivory/30 bg-brand-black">or</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block space-y-2">
              <span className="font-space text-xs text-brand-ivory/60 uppercase tracking-widest">Full Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-brand-ivory outline-none focus:border-brand-gold/40 focus:bg-white/10 transition-colors"
              />
            </label>

            <label className="block space-y-2">
              <span className="font-space text-xs text-brand-ivory/60 uppercase tracking-widest">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-brand-ivory outline-none focus:border-brand-gold/40 focus:bg-white/10 transition-colors"
              />
            </label>

            <label className="block space-y-2">
              <span className="font-space text-xs text-brand-ivory/60 uppercase tracking-widest">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-brand-ivory outline-none focus:border-brand-gold/40 focus:bg-white/10 transition-colors"
              />
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full mt-6 font-space text-xs font-semibold uppercase tracking-wider bg-brand-gold text-brand-black py-3 rounded-lg hover:bg-brand-ivory transition-all shadow-glow"
            >
              Sign Up
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-xs font-space text-brand-ivory/40">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-gold hover:text-brand-ivory transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
