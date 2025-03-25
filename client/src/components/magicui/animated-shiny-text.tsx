"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedShinyText: React.FC<AnimatedShinyTextProps> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-block animate-shimmer bg-gradient-to-r from-green-500 via-blue-500 to-green-500 bg-[length:200%_100%] bg-clip-text text-transparent",
        className
      )}
      style={{
        animationDuration: "3s",
      }}
    >
      {children}
    </span>
  );
};
