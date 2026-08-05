import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, target, rel, loading, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-mono font-bold uppercase tracking-[0.15em] transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl";

    const variants = {
      primary: "bg-slate-900 text-white hover:bg-primary shadow-lg shadow-slate-900/10",
      secondary: "bg-primary/10 text-primary hover:bg-primary/20",
      outline: "border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900",
      ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
      success: "bg-emerald-50 text-emerald-600 border border-emerald-100"
    };

    const sizes = {
      sm: "px-4 py-2 text-[9px]",
      md: "px-6 py-3 text-[11px]",
      lg: "px-8 py-4 text-xs"
    };

    const content = (
      <>
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          target={target}
          rel={rel}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-100", className)}
      {...props}
    />
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'outline', className }: BadgeProps) => {
  const variants = {
    primary: "bg-primary/5 text-primary border-primary/10",
    secondary: "bg-slate-50 text-slate-500 border-slate-100",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    outline: "bg-white border-slate-200 text-slate-500"
  };

  return (
    <span className={cn(
      "px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-lg border font-mono whitespace-nowrap",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
