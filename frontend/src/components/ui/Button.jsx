import clsx from "clsx";

const variants = {
  primary:
    "accent-bg text-white accent-bg-hover active:scale-[0.98] disabled:opacity-50 glow-box",
  secondary:
    "bg-white/10 text-white hover:bg-white/20 active:scale-[0.98] disabled:opacity-50",
  ghost:
    "text-slate-300 hover:bg-white/10 hover:text-white active:scale-[0.98] disabled:opacity-40",
  danger:
    "bg-rose-500 text-white hover:bg-rose-600 active:scale-[0.98] disabled:bg-rose-800 disabled:text-rose-300",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}