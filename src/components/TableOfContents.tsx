import { useMemo } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F]+/gi, "-")
    .replace(/^-+|-+$/g, "");

export const parseHeadings = (html: string): TocItem[] => {
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    if (text) {
      items.push({ id: slugify(text), text, level: Number(match[1]) });
    }
  }
  return items;
};

export const injectHeadingIds = (html: string): string =>
  html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugify(text);
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });

interface Props {
  html: string;
}

const TableOfContents = ({ html }: Props) => {
  const items = useMemo(() => parseHeadings(html), [html]);

  if (items.length === 0) return null;

  return (
    <nav className="surface-panel mb-10 p-5 rounded-[4px]">
      <p className="text-xs uppercase tracking-[0.15em] text-white font-medium mb-3 flex items-center gap-2">
        <span className="inline-block w-4 h-[2px] bg-primary" />
        Table of Contents
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${item.id}`}
              className="text-sm text-white hover:text-primary transition-colors leading-relaxed font-normal"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
