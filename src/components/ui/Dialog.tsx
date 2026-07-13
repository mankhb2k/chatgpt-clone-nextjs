import React, { useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showOverlayBlur?: boolean;
}

export function Dialog({
  isOpen,
  onClose,
  children,
  className = "",
  showOverlayBlur = false,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-[#0d0d0d]/30 transition-opacity ${
          showOverlayBlur ? "backdrop-blur-sm bg-[#0d0d0d]/60" : ""
        }`}
        onClick={onClose}
      />

      {/* Main dialog content body */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full rounded-2xl border border-[#2f2f2f] bg-[#212121] text-[#ececec] shadow-2xl overflow-hidden flex flex-col transition-all ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
