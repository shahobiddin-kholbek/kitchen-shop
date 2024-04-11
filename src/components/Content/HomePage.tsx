"use client"
import { useGetProductsQuery } from "@/provider/redux/apies/productsApi";
import { useState, ChangeEvent, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ui/ProductCard/ProductCard";
import SideBarCP from "./SideBar/SideBar";
import './home_page.css'
// @ts-ignore
import { useDebounce } from "use-lodash-debounce";
import { RootState } from "@/provider/redux/store";
import { Product } from "@/Types/types";


const HomePage =  memo(()=> {
  const { minPrice, maxPrice, sortByPrice, category, cart: cartItems } = useSelector(
    (state: RootState) => state.filters
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue, 400);
  const debouncedMinPrice = useDebounce(minPrice, 400);
  const debouncedMaxPrice = useDebounce(maxPrice, 400);

  const {
    data: products = [],
    isLoading,
    isError: productsIsError,
    error: productsError
  } = useGetProductsQuery({
    sortByPrice,
    category,
    minPrice: debouncedMinPrice,
    maxPrice: debouncedMaxPrice,
    searchValue: debouncedSearchValue,
  });

  useEffect(() => {
  }, [products])
  

  function OnSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchValue(value);
  }

  function IsItemOnCard(id: string) {
    return cartItems.find((item: Product) => item.id === id);
  }

  return (
    <main className="mainContent">
      <form style={{ marginBottom: 20, border: "none" }}>
        <input
          type="search"
          placeholder="Search..."
          value={searchValue}
          onChange={OnSearchChange}
        />
      </form>
      <section className="content ">
        <div className="sideBar">
          <SideBarCP />
        </div>
        <div className="cards ">
          {isLoading && (
            <div>
              <h1>Loading...</h1>
            </div>
          )}

          {(productsIsError && productsError !== undefined) && (
            <h1 className="text-[red] text-[1.2rem]">
              {(productsError as any).status == 'FETCH_ERROR' && 'Ошибка загрузки данных!'}
            </h1>
          )}

          {products.length > 0 && (
            products
              .map((product: Product) => (
                <ProductCard
                  IsItemOnCard={IsItemOnCard}
                  key={product.id}
                  product={product}
                />
              ))
              .reverse()
          )
          }

          {products.length === 0 && (productsError as any) === undefined && <h1>Нет товаров</h1>}
        </div>
      </section>
    </main>
  );
}
)
export default HomePage