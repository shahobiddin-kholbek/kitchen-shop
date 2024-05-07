import createMiddleware from 'next-intl/middleware';
import { locales } from './navigation';

export default createMiddleware({
  locales,
  defaultLocale: 'tj',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};