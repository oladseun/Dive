"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { signup } from "../actions";
import { Button } from "@/components/ui";

export default function SignupPage({
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
          Get <span className="text-blue-600">Started.</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Create your account and start managing your opportunities.
        </p>
      </motion.div>
      
      {searchParams?.message && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl flex items-start gap-3"
        >
          <div className="mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs font-medium leading-relaxed">{searchParams.message}</p>
        </motion.div>
      )}

      <form action={signup} className="space-y-6">
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-slate-700 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <input
                name="name"
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400 text-sm"
                required
              />
            </div>
          </motion.div>

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
            <label htmlFor="password" className="text-xs font-semibold text-slate-700 ml-1">
              Password
            </label>
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
            <p className="text-[10px] text-slate-400 ml-1 font-medium italic">
              Minimum 8 characters required.
            </p>
          </motion.div>
        </div>
        
        <Button
          type="submit"
          size="lg"
          className="w-full"
        >
          Create Account
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </form>
      
      <motion.div variants={itemVariants} className="text-center pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-500 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 transition-all font-bold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

