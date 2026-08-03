import React from "react";
import { statusColor } from "../lib/mockProfAdminData";

export default function Pill({ children }) {
  return (
    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${statusColor[children] || "bg-stone-100 text-stone-600"}`}>
      {children.toUpperCase()}
    </span>
  );
}
