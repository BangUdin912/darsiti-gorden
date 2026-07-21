"use client";

import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AdminShell({
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="flex">

        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        {/* Content */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">

          {/* Header */}
          <Header
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />

          {/* Main */}
          <main
            className="
              flex-1
              overflow-x-hidden
              p-4
              sm:p-6
              lg:p-8
            "
          >
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}