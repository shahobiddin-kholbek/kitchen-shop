"use client"
import { useTranslations } from "next-intl";
import "./menu_nav.css";
import Link from "next/link";
import { usePathname } from '@/navigation';

interface MenuItem {
  label: string;
  path: string;
}

export default function MenuNav() {
  const t = useTranslations("MenuNav");
  const pathname = usePathname();

  const items: MenuItem[] = [
    {
      label: t(""),
      path: "/",
    },
    {
      label: t("products"),
      path: "/products",
    },
    // {
    //   label: t("Admin"),
    //   path: "/admin",
    // },
  ];

  return (
    <nav className="navigation">
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <Link scroll={false} href={item.path}
              className={pathname === item.path ? 
                "text-orange-500 font-extrabold dark:text-orange-800 " : 
                "text-black dark:text-white" 
              }
              >
              <span className="text-[1.2rem] font-semibold">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

