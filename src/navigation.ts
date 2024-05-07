import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['tj','en', 'ru'];

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
});