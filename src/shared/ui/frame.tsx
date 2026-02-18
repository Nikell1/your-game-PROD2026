import { CSSProperties } from "react";
import { COLOR_PRIMARY } from "../constants";
import { cn } from "../lib";

interface FrameProps {
  color?: string;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  isSolid?: boolean;
}

export function Frame({
  children,
  color = COLOR_PRIMARY,
  className,
  style = {},
  isSolid = false,
}: FrameProps) {
  return (
    <div
      className={cn(className, "backdrop-blur-xs border flex")}
      style={
        isSolid
          ? {
              ...style,
              backgroundColor: color,
              borderColor: color,
              boxShadow: `inset 0 0 0 1000px rgba(0,0,0,0.9)`,
            }
          : {
              ...style,
              backgroundColor: `${color}10`,
              borderColor: color,
            }
      }
    >
      {children}
    </div>
  );
}
