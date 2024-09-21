"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export function Modal({ children }: Props) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <dialog
        ref={dialogRef}
        className="relative flex h-auto max-h-dvh w-4/5 max-w-7xl items-center justify-center rounded-xl border-none bg-white p-5 text-4xl font-medium"
        onClose={onDismiss}
      >
        {children}
        <button
          onClick={onDismiss}
          className="absolute right-2.5 top-2.5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-xl font-medium after:text-black after:content-['x'] hover:bg-gray-200"
        />
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
