import { Icon } from "@iconify/react";
import Link from "next/link";

interface PageHeaderConfig {
  title: string;
  subtitle: string;
  icon?: string;
  bgColor?: string;
  breadcrumbs: { label: string; href?: string }[];
}

interface PageHeaderProps {
  config: PageHeaderConfig;
}

export default function PageHeader({ config }: PageHeaderProps) {
  return (
    <div className={`${config.bgColor ?? 'bg-green-600'} py-15 px-6`}>
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
          {config.breadcrumbs.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              {idx !== 0 && <span>/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition">{item.label}</Link>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {config.icon && (
  <div className="bg-white/20 rounded-2xl w-14 h-14 flex items-center justify-center">
    <Icon icon={config.icon} className="text-white text-2xl" />
  </div>
)}
          <div>
            <h1 className="text-white text-4xl font-bold">{config.title}</h1>
            <p className="text-white/80 text-md mt-1">{config.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}