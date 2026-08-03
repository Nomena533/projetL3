import React from "react";

export default function ValihaStrings({ className = "", count = 14, tone = "amber" }) {
  const colors = { amber: "bg-amber-500/70", stone: "bg-stone-400/40", teal: "bg-teal-400/30" };
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const h = 40 + Math.round(30 * Math.abs(Math.sin(i * 1.3)));
        return <div key={i} className={`w-[2px] ${colors[tone]} rounded-full`} style={{ height: `${h}%` }} />;
      })}
    </div>
  );
}
