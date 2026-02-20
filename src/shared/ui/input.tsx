import * as React from "react";

import { cn } from "@/shared/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  isNumber?: boolean;
}

function Input({
  className,
  type,
  isNumber = false,
  onChange,
  min,
  max,
  ...props
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber) {
      const value = e.target.value;
      if (value === "" || /^\d+$/.test(value)) {
        const numValue = value === "" ? "" : Number(value);
        if (min !== undefined && numValue < min) return;
        if (max !== undefined && numValue > max) return;
        onChange?.(e);
      }
    } else {
      onChange?.(e);
    }
  };
  return (
    <input
      min={min}
      max={max}
      onChange={handleChange}
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        " focus-visible:ring-white/20 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
