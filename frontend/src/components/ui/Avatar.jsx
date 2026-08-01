import clsx from "clsx";

const palette = [
  "bg-cyan-500/20 text-cyan-300",
  "bg-emerald-500/20 text-emerald-300",
  "bg-amber-500/20 text-amber-300",
  "bg-rose-500/20 text-rose-300",
  "bg-violet-500/20 text-violet-300",
];

function hashTone(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h + str.charCodeAt(i)) % palette.length;
  return palette[h];
}

export default function Avatar({ initials, size = "md", className }) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg" };
  return (
    <div
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        hashTone(initials || "?"),
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}