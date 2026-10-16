import React from "react";

export default function Field({ label, placeholder, icon: Icon, type = "text" }) {
  return (
    <label className="block mb-3">
      <span className="text-xs font-body font-medium text-stone-500">{label}</span>
      <div className="mt-1 flex items-center border border-stone-300 rounded-sm px-3 py-2 focus-within:border-amber-600">
        {Icon && <Icon size={15} className="text-stone-400 mr-2" />}
        <input type={type} placeholder={placeholder} className="w-full text-sm font-body outline-none bg-transparent text-teal-950" />
      </div>
    </label>
  );
}
