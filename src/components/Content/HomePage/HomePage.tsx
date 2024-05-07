'use client'
import { useGetProductsQuery } from '@/provider/redux/apies/productsApi';
import Banner from './Banner/Banner';
import './homePage.css'
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import { Product } from '@/Types/types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ProductSkeleton from '@/components/ui/Skeletons/ProductSkeleton';
import { URLS_PAGES } from '@/config/pages-url.config';

export default function HomePage() {
  const t = useTranslations('Index');
  const {
    data: productsData = [],
    isLoading: homePageIsLoading,
    isError: productsIsError,
    error: productsError
  } = useGetProductsQuery({});

  return (
    <section className="homePage pb-8 pt-5">
      <Banner />
      <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:gap-10 lg:gap-14">
        {homePageIsLoading && (
            [...new Array(6)].map((_, i) => (
              <div key={i} className={`border border-gray-100`}>
                <ProductSkeleton />
              </div>
            ))
          )
        }
        {
          productsData.length > 0 && productsData.slice(0, 6).map((product: Product) =>
            <ProductCard key={product.id} product={product} />
          )
        }
      </div>

      <Link className="text-red-500 text-xl hover:text-red-400" href={URLS_PAGES.PRODUCTS}>{t('seeAll')}</Link>
    </section>
  );
}
