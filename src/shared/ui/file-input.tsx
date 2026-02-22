"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/shared/lib";

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
  buttonText?: string;
  showFileName?: boolean;
}

export function FileInput({
  onChange,
  accept = "image/*",
  className,
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileNameRef = useRef<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      fileNameRef.current = file.name;
    }
    onChange(e);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "cursor-pointer border-primary/50",
          "flex items-center gap-3 px-4 py-3 w-full",
          "border-2 rounded-lg",
          "transition-all duration-200",
          "focus:outline-none",
        )}
      >
        <Upload className="w-5 h-5 text-foreground" />
        <span className="text-sm text-foreground font-medium">
          Загрузить файл
        </span>
      </button>
    </div>
  );
}
