"use client"
import "./menu_nav.css";
import Link from "next/link";
import { usePathname } from 'next/navigation'

interface MenuItem {
  label: string;
  path: string;
}

export default function MenuNav() {
  const pathname = usePathname()

  const items: MenuItem[] = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Admin",
      path: "/admin",
    },
  ];

  return (
    <nav className="navigation">
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <Link scroll={false} href={item.path} className={pathname === item.path ? "linkActive" : "linkNonActive"}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
