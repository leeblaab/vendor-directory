import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-ink/60 mb-4">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className="material-symbols-outlined text-base">chevron_right</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-brass transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-ink font-medium truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}