"use client";

import Image from "next/image";
import { useState } from "react";
import type { Vendor } from "@/data/marketplace";

type VendorLogoSize = "sm" | "md" | "lg";

const sizeStyles: Record<VendorLogoSize, string> = {
  sm: "h-9 w-12 rounded-lg",
  md: "h-12 w-16 rounded-xl",
  lg: "h-16 w-24 rounded-2xl",
};

const imageSizes: Record<VendorLogoSize, string> = {
  sm: "48px",
  md: "64px",
  lg: "96px",
};

export function VendorLogo({
  vendor,
  size = "md",
  className = "",
}: {
  vendor: Vendor;
  size?: VendorLogoSize;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-ink/10 ${sizeStyles[size]} ${className}`}
      style={{
        backgroundColor: failed ? vendor.color : vendor.logoBackground,
      }}
    >
      {failed ? (
        <span className="font-mono text-[10px] font-black text-ink">
          {vendor.shortName}
        </span>
      ) : (
        <Image
          src={vendor.logoPath}
          alt={`${vendor.name} logo`}
          fill
          sizes={imageSizes[size]}
          className={`object-contain ${
            vendor.logoShape === "mark" ? "p-[18%]" : "p-[10%]"
          }`}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
