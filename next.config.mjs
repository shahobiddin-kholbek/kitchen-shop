import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
       optimizePackageImports: [
        'antd',
        'react-icons',
       ]
   }
};
 
export default withNextIntl(nextConfig);