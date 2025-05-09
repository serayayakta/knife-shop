"use client";

import { useState, ReactNode } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type AdminSectionBoxProps = {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  defaultOpen?: boolean;
};

export default function AdminSectionBox({
  title,
  children,
  actions,
  defaultOpen = true,
}: AdminSectionBoxProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-lg font-semibold flex items-center gap-2">
          {open ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
          {title}
        </h2>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}
