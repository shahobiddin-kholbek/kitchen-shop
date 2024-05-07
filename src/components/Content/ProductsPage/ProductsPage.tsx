'use client'
import React, { ChangeEvent, useMemo, useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";
import { Product } from "@/Types/types";
import styles from './productsPage.module.scss'
import { useGetProductsQuery } from '@/provider/redux/apies/productsApi';
import SideBarCP from '../SideBar/SideBar';
import ProductSkeleton from '@/components/ui/Skeletons/ProductSkeleton';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
// @ts-ignore
import { useDebounce } from "use-lodash-debounce";
import { useTranslations } from 'next-intl';
export default function ProductsPage() {
    const t = useTranslations('productsPage')
    const { minPrice, maxPrice, sortByPrice, category, cart: cartItems } = useSelector(
        (state: RootState) => state.filters
    );
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(searchValue, 400);
    const debouncedMinPrice = useDebounce(minPrice, 400);
    const debouncedMaxPrice = useDebounce(maxPrice, 400);

    const productsQueryParams = useMemo(() => ({
        sortByPrice,
        category,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        searchValue: debouncedSearchValue,
    }), [sortByPrice, category, debouncedMinPrice, debouncedMaxPrice, debouncedSearchValue]);

    const {
        data: products = [],
        isLoading,
        isError: productsIsError,
        error: productsError
    } = useGetProductsQuery(productsQueryParams);

    function OnSearchChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchValue(value);
    }

    return (
        <section className={`${styles.mainContent}`}>
            <form style={{ marginBottom: 20, border: "none" }}>
                <input
                    type="search"
                    placeholder={t("search")}
                    value={searchValue}
                    onChange={OnSearchChange}
                />
            </form>
            <div className={`${styles.content}`}>
                <div className={`${styles.sideBar}`}>
                    <SideBarCP />
                </div>
                <div className={`${styles.cards}`}>
                    {isLoading && (
                        [...new Array(6)].map((_, i) => (
                            <span key={i} className={`border border-gray-100`}>
                                <ProductSkeleton />
                          </span>
                        ))
                    )}

                    {(productsIsError && productsError !== undefined) && (
                        <h1 className={`text-[red] text-[1.2rem]`}>
                            {(productsError as any).status == 'FETCH_ERROR' && 'Ошибка загрузки данных!'}
                        </h1>
                    )}

                    {products.length > 0 && (
                        products
                            .map((product: Product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                            .reverse()
                    )
                    }

                    {products.length === 0 && (productsError as Error) === undefined && isLoading === false && <h1>Нет товаров</h1>}
                </div>
            </div>
        </section>
    )
}
