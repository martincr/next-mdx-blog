"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AlignLeft, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import HeaderNav from "@/components/header-nav";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SiteHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="font-serif text-lg text-foreground hover:text-primary"
        >
          {siteConfig.author}
        </Link>
        <div className="flex items-center gap-4">
          <HeaderNav />
          <ThemeToggle />
          <Button
            variant="ghost"
            className="p-0 text-foreground hover:bg-transparent hover:text-foreground md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <X className="size-5" />
            ) : (
              <AlignLeft className="size-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      {isMobileOpen && (
        <MobileNav onOpenChange={() => setIsMobileOpen(false)} />
      )}
    </header>
  );
}
