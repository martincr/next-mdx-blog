import React, { PropsWithChildren } from "react";
import SiteHeader from "@/components/site-header";
import { siteConfig } from "@/config/site";

export default function App({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.author}
          </p>
        </div>
      </footer>
    </div>
  );
}
