"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { resetPasswordForEmail } from "../actions";
import { Button } from "@/components/ui";

export default function ForgotPasswordPage({
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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <h1 className="text-4xl font-display font-black tracking-tightest text-slate-900 leading-tight">
          Reset <span className="text-blue-600">Password.</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </motion.div>
      
      {searchParams?.message && (
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

      <form action={resetPasswordForEmail} className="space-y-6">
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
        </div>
        
        <Button
          type="submit"
          size="lg"
          className="w-full"
        >
          Send Reset Link
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </form>
      
      <motion.div variants={itemVariants} className="text-center pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-500 font-medium">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 transition-all font-bold">
            Sign In
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
