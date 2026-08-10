import React from "react";

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-stone-200 rounded-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
        <Icon size={18} className="text-amber-700" />
      </div>
      <div>
        <p className="font-mono text-xl text-teal-950">{value}</p>
        <p className="text-xs text-stone-500">{label}</p>
      </div>
    </div>
  );
}
