"use client";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LIST } from "@/constants";

interface MobileNavProps {
  onOpenChange: () => void;
}

export default function MobileNav({ onOpenChange }: MobileNavProps) {
  return (
    <div className="fixed inset-0 top-14 z-50 bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex flex-col p-6">
        {NAV_LIST.map((item) => (
          <MobileLink
            key={item.label + item.path}
            href={item.path}
            className="border-b border-border/40 py-4 text-base last:border-0"
            onOpenChange={onOpenChange}
          >
            {item.label}
          </MobileLink>
        ))}
      </div>
    </div>
  );
}

interface MobileLinkProps extends LinkProps {
  children: ReactNode;
  onOpenChange?: () => void;
  className?: string;
}

const MobileLink = ({
  children,
  onOpenChange,
  className,
  href,
  ...props
}: MobileLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.();
      }}
      className={cn(
        "transition-colors",
        pathname === href.toString()
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
