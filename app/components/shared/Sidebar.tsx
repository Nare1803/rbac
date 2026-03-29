"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    href: "/dashboard",
    label: "Dashboard",
    roles: ["ADMIN", "DOCTOR", "PATIENT"] as const,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/dashboard/patients",
    label: "Պացիենտներ",
    roles: ["ADMIN", "DOCTOR"] as const,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/dashboard/doctors",
    label: "Բժիշկներ",
    roles: ["ADMIN"] as const,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;
  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  const visibleNav = NAV.filter(
    (n) => role && (n.roles as readonly string[]).includes(role),
  );

  const NavLink = ({ item }: { item: (typeof NAV)[0] }) => {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                    font-medium transition-all
                    ${
                      active
                        ? "bg-[#185FA5] text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}
      >
        <span className={active ? "text-white" : "text-gray-400"}>
          {item.icon}
        </span>
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-gray-100 bg-white min-h-screen">
        <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#185FA5] flex items-center justify-center shrink-0">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-[15px]">
            MedPanel
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {visibleNav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div
              className="w-7 h-7 rounded-full bg-blue-100 flex items-center
                            justify-center text-[11px] font-semibold text-[#185FA5] shrink-0"
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-gray-900 truncate">
                {session?.user?.name}
              </p>
              <p className="text-[11px] text-gray-400 truncate">{role}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                       font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Ելք
          </button>
        </div>
      </aside>

      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t
                      border-gray-100 flex items-center justify-around px-2 py-2 safe-b"
      >
        {visibleNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg
                          transition-colors
                          ${active ? "text-[#185FA5]" : "text-gray-400"}`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg
                     text-red-400 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="text-[10px] font-medium">Ելք</span>
        </button>
      </nav>
    </>
  );
}
