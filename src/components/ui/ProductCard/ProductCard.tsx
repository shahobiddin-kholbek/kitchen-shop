"use client"
import { Tag} from "antd";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import "./product_card.css";
import { Product, ProductCardProps } from "../../../Types/types";
import { BsCartDashFill } from "react-icons/bs";
import { useEffect } from "react";
import { setCart } from "@/provider/redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider/redux/store";
import { CartItem } from "@/Types/cart_types";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ProductCard({
  product,
}: ProductCardProps) {
  const t = useTranslations("productCard");
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { cart: cartItems = [] } = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      dispatch(setCart(parsedCartItems));
    }
  }, [dispatch]);

  function AddToCart(product: Product) {
    const existingCartItem = cartItems.find((item: CartItem) => item.id === product.id);

    if (!existingCartItem) {
      const newCartItem: CartItem = { ...product, count: 1 };
      const newCartItems = [...cartItems, newCartItem];
      // localStorage.setItem("cart", JSON.stringify(newCartItems));
      dispatch(setCart(newCartItems));
    }
  }

  const cartItemCount = (id: string, counter: string) => {
    const updatedCartData = cartItems.map((item: CartItem) => {
      if (item.id === id) {
        if (counter === "incr") {
          return { ...item, count: (item as CartItem).count + 1 };
        } else if (counter === 'decr') {
          return { ...item, count: Math.max((item as CartItem).count - 1, 1) };
        }
      }
      return item;
    });
    dispatch(setCart(updatedCartData));
  };

  function IsItemOnCard(id: string) {
    return cartItems.find((item: Product) => item.id === id);
  }
  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  }

  return (
    <>
      <div
        className="w-[255px] h-[355px] pb-[10px] dark:bg-[#2b2b2b] bg-white rounded-lg border dark:border-gray-950 border-gray-300 p-4 pt-6 product-card"
        onClick={handleCardClick}
      >
        <div className="flex justify-center mb-4">
          {product && product.img && product.img[0] && (
            <img
              draggable="false"
              className="w-48 h-48 object-cover"
              src={product.img[0]}
              alt={product.name}
            />
          )}
        </div>
        <div className="flex flex-col h-[103px] justify-between">
          <h1 className="mb-0 text-[24px] font-semibold">{product.name}</h1>
          <div className="flex justify-between items-center">
            <Tag className="text-[16px] dark:border-gray-600 dark:bg-[#1c1a1a] text-[green]">{t("price")}: {product.price}</Tag>
            <div onClick={(e) => {
              e.stopPropagation();
            }}>

              {IsItemOnCard(product.id) ? (
                <div className="flex text-[red] p-t-[5px] p-b-[5px] items-center justify-around w-[100px] h-[32px] border rounded-md border-red-600 ">
                  <button className="border-0 p-0" onClick={() => cartItemCount(product.id, 'decr')}>
                    <TiMinus className="fill-[red] hover:opacity-80 w-[20px] h-[20px]" />
                  </button>
                  <h1 className="text-[1.2rem] text-black dark:text-white">
                    {IsItemOnCard(product.id) &&
                      (cartItems.find((item: Product) => item.id === product.id) as CartItem)?.count
                    }
                  </h1>
                  <button className="border-0 p-0" onClick={() => cartItemCount(product.id, 'incr')} >
                    <FaPlus className="fill-[red] hover:opacity-70 w-[20px] h-[20px]" />
                  </button>
                </div>
              ) : (
                <button
                  title="Добавить в корзину"
                  className="text-sm p-[5px] rounded-md w-[110px] border-2 border-red-700 hover:opacity-80 flex gap-1 items-center justify-center"
                  style={{ color: IsItemOnCard(product.id) ? "green" : "red" }}
                  onClick={() => AddToCart(product)}
                >
                  {t("add")} {' '} <BsCartDashFill style={{ width: 20, height: 20 }} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
