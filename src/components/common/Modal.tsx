"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  width?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  open,
  title,
  children,
  onClose,
  width = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const widthClass = {
    sm: "max-w-lg",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
  };

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/55
        backdrop-blur-sm
        px-4
        py-10
      "
    >
        <div className="flex min-h-full items-center justify-center py-12">

      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative
          w-full
          ${widthClass[width]}
          max-h-[85vh]
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        `}
      >
        {/* Header */}
        <div
          className="
            sticky
            top-0
            z-20
            flex
            items-center
            justify-between
            border-b
            border-stone-200
            bg-white
            px-8
            py-5
          "
        >
          <h2 className="text-2xl font-bold text-stone-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-stone-100
              transition-all
              hover:bg-stone-200
              hover:rotate-90
            "
          >
            <X size={22} className="text-stone-700" />
          </button>
        </div>

        {/* Body */}
        <div
          className="
            overflow-y-auto
            px-8
            py-6
          "
          style={{
            maxHeight: "calc(85vh - 84px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
    </div>
  );
}