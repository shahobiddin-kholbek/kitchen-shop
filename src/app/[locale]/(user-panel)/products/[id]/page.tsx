'use client'
import ProductModal from "@/components/ui/ProductCard/ProductItemModal/ProductModal"
import { setCart } from "@/provider/redux"
import { useGetProductQuery } from "@/provider/redux/apies/productsApi"
import { AppDispatch, RootState } from "@/provider/redux/store"
import { CartItem } from "@/Types/cart_types"
import { Product } from "@/Types/types"
import { useTranslations } from "next-intl"
import { notFound } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
type Props = {
  params: { id: string },
}
export default function ProductInfo({ params }: Props) {
  const t = useTranslations("productCard");
  const { data: product, isLoading: productIsLoading } = useGetProductQuery(params && params.id)

  const { cart: cartItems = [] } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();
  function IsItemOnCard(id: string) {
    return cartItems.find((item: Product) => item.id === id);
  }

  const handleRemoveFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item: CartItem) => item.id !== id);
    dispatch(setCart(updatedCart));
  }
  function AddToCart(product: Product) {
    const existingCartItem = cartItems.find((item: CartItem) => item.id === product.id);

    if (!existingCartItem) {
      const newCartItem: CartItem = { ...product, count: 1 };
      const newCartItems = [...cartItems, newCartItem];
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      dispatch(setCart(newCartItems));
    }
  }
  return (
    <div className="">
      {
        !product && !productIsLoading && (
          notFound()
        )
      }
      {
        product && (
          <div >
            <ProductModal
              product={product}
              AddToCart={(product) => AddToCart(product)}
              IsItemOnCard={IsItemOnCard}
              handleRemoveFromCart={handleRemoveFromCart} />
          </div>
        )
      }
    </div>
  )
}
