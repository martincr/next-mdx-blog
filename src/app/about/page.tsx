import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SOCIALS } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 lg:px-12 py-16 lg:py-24">
      <p className="mb-4 text-xs tracking-widest uppercase text-muted-foreground">
        About
      </p>
      <h1 className="mb-16 font-serif text-display-md leading-tight text-foreground">
        A short introduction.
      </h1>

      <div className="grid gap-16 lg:grid-cols-[280px_1fr] lg:gap-24">
        <div className="lg:pt-1">
          <Image
            src={siteConfig.authorImage}
            width={280}
            height={360}
            alt={siteConfig.author}
            className="w-full object-cover grayscale"
          />
          <p className="mt-4 text-sm text-foreground">{siteConfig.author}</p>
          <p className="text-xs text-muted-foreground">Software Engineer</p>
          <div className="mt-4 flex flex-wrap gap-4">
            {SOCIALS.map((social) => (
              <Link
                key={social.label}
                href={social.path}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-prose space-y-6 text-base leading-[1.85] text-muted-foreground">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            harum odio! Molestias natus possimus dolorem modi libero eaque in
            aliquam harum recusandae nam! Reprehenderit soluta fuga
            consequuntur, iure corrupti autem!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            asperiores voluptate, veritatis non placeat numquam. Repellendus
            mollitia aut reprehenderit est. Reprehenderit soluta fuga
            consequuntur, iure corrupti autem!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            asperiores voluptate, veritatis non placeat numquam. Repellendus
            mollitia aut reprehenderit est.
          </p>
        </div>
      </div>
    </div>
  );
}
