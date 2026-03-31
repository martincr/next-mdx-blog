import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-display-md leading-none tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="max-w-[52ch] text-base leading-[1.85] text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
