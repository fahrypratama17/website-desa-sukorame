"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";

export default function SubmitButton({ text = "Simpan Data", loadingText = "Menyimpan...", externalLoadingText = "Tunggu..." }: { text?: string, loadingText?: string, externalLoadingText?: string }) {
  const { pending } = useFormStatus();
  const [isExternalDisabled, setIsExternalDisabled] = useState(false);

  useEffect(() => {
    const handleDisable = (e: Event) => setIsExternalDisabled((e as CustomEvent).detail);
    window.addEventListener('submit-button-disable', handleDisable);
    return () => window.removeEventListener('submit-button-disable', handleDisable);
  }, []);

  const disabled = pending || isExternalDisabled;

  return (
    <button
      type="submit"
      disabled={disabled}
      className="px-6 py-3 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending || isExternalDisabled ? (
        <>
          <FiLoader className="w-5 h-5 animate-spin" />
          {isExternalDisabled ? externalLoadingText : loadingText}
        </>
      ) : (
        <>
          <FiCheck className="w-5 h-5" />
          {text}
        </>
      )}
    </button>
  );
}
