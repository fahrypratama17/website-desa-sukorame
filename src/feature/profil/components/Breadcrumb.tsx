import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="font-inter-400 flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-green-450">&gt;</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-green-450 transition-colors duration-200 hover:text-green-250"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-inter-600 text-green-50">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
