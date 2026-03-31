import { TocItem } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: TocItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings.length) return null;
  return (
    <nav>
      <p className="mb-4 text-xs tracking-widest uppercase text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && "pl-3")}>
            <a
              href={`#${heading.id}`}
              className="block text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
