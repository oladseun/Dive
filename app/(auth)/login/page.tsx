"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { login } from "../actions";
import { Button } from "@/components/ui";
import { toast } from "sonner";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (searchParams?.message?.includes("Successfully signed up")) {
      toast.success("Successfully signed up!", {
        description: "Please check your email to confirm your account.",
      });
    }
  }, [searchParams?.message]);

  const isSuccessMessage = searchParams?.message?.includes("Successfully signed up");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <h1 className="text-4xl font-display font-black tracking-tightest text-slate-900 leading-tight">
          Welcome <span className="text-blue-600">Back.</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Sign in to your account to continue your journey.
        </p>
      </motion.div>

      {searchParams?.message && !isSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start gap-3"
        >
          <div className="mt-0.5">
            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-xs font-medium leading-relaxed">{searchParams.message}</p>
        </motion.div>
      )}

      <form action={login} className="space-y-6">
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-slate-700 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <input
                name="email"
                id="email"
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400 text-sm"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label htmlFor="password" className="text-xs font-semibold text-slate-700">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <input
                name="password"
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400 text-sm"
                required
              />
            </div>
          </motion.div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
        >
          Sign In
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </form>

      <motion.div variants={itemVariants} className="text-center pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-500 font-medium">
          New to Dive?{" "}
          <Link href="/signup" className="text-blue-600 hover:text-blue-700 transition-all font-bold">
            Create an account
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

