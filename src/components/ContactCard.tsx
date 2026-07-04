interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href: string;
  color: string;
}

export default function ContactCard({ items }: { items: ContactItem[] }) {
  if (items.length === 0) {
    return (
      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl text-center">
        <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-3xl mb-2">
          info
        </span>
        <p className="text-yellow-800 dark:text-yellow-300 text-sm">
          Contact information not available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">contact_phone</span>
        Contact Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-[1.02] ${item.color}`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
              <div className="text-sm font-medium truncate">{item.value}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}