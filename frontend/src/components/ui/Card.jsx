import clsx from "clsx";

export default function Card({ children, className, padded = true }) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-white/10 bg-white/5 backdrop-blur",
        padded && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}