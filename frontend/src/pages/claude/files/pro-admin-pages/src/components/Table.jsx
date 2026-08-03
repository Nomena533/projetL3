import React from "react";

export const Th = ({ children }) => <th className="text-left text-xs font-mono text-stone-400 font-normal px-4 py-3">{children}</th>;

export const Td = ({ children, className = "" }) => <td className={`px-4 py-3 text-sm text-teal-950 ${className}`}>{children}</td>;
