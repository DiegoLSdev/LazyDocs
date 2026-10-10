import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-[15px]",
};

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 " +
    "shadow-[inset_0_1px_0_hsl(0_0%_100%/0.16),0_1px_2px_hsl(var(--foreground)/0.2),0_10px_24px_-10px_hsl(var(--primary)/0.7)]",
  secondary:
    "bg-card text-foreground ring-1 ring-inset ring-border hover:bg-secondary/60 " +
    "shadow-[0_1px_2px_hsl(var(--foreground)/0.06)] dark:bg-foreground/[0.04] dark:ring-foreground/10 dark:hover:bg-foreground/[0.08]",
  inverse:
    "bg-[var(--cta-fg)] text-[var(--cta-bg)] hover:opacity-90 shadow-[0_1px_2px_rgb(0_0_0/0.3),0_12px_30px_-12px_hsl(var(--primary)/0.6)] " +
    "dark:bg-primary dark:text-primary-foreground",
  ghost: "text-[var(--cta-fg)] ring-1 ring-inset ring-[var(--cta-line)] hover:bg-[var(--cta-line)]",
};

export default function LandingButton({
  to,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    "group inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-medium tracking-[-0.01em] transition-[background-color,box-shadow,color,opacity,transform] duration-200 ease-out",
    "active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    sizes[size],
    variants[variant],
    className
  );

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
