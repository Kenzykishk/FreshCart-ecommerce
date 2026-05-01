"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

export default function ProfileSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/profile/addresses", icon: "mdi:map-marker", label: "My Addresses" },
    { href: "/profile/settings", icon: "mdi:cog", label: "Settings" },
  ];

  return (
    <aside className="w-65 shrink-0">  
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 text-md font-semibold text-black border-b border-gray-100">
          My Account
        </div>
        <nav className="p-2 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-green-50 text-green-700 shadow-sm"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <div className="flex items-center gap-2.5">
                
                <div className={`bg-gray-50 p-2.5 rounded-lg ${isActive?"bg-green-500":"bg-gray-50"}` }>
                    <Icon
                    icon={link.icon}
                    className={`text-base ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-green-600"
                    }`}
                  />
                </div>
                  <span className="text-md font-medium">{link.label}</span>
                </div>
                <Icon
                  icon="mdi:chevron-right"
                  className={`text-md ${
                    isActive ? "text-white/70" : "text-gray-300 group-hover:text-green-500"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}