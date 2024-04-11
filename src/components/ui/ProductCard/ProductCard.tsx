"use client"
import { Typography, Tag, Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import "./product_card.css";
import { Product, ProductCardProps } from "../../../Types/types";
import { BsCartDashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import ProductModal from "./ProductItemModal/ProductModal";
import { setCart } from "@/provider/redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider/redux/store";
import { CartItem } from "@/Types/cart_types";

export default function ProductCard({
  product,
  IsItemOnCard,
}: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { cart: cartItems = [] } = useSelector((state: RootState) => state.filters);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      dispatch(setCart(parsedCartItems));
    }
  }, [dispatch]);

  const saveCartToLocalStorage = (updatedCartData: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCartData));
  };


  function AddToCart(product: Product) {
    const existingCartItem = cartItems.find((item: CartItem) => item.id === product.id);
    
    if (!existingCartItem) {
      const newCartItem: CartItem = { ...product, count: 1 }; 
      const newCartItems = [...cartItems, newCartItem]; 
      saveCartToLocalStorage(newCartItems);
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

  const handleRemoveFromCart = (id: string) =>{
    const updatedCart = cartItems.filter((item: CartItem) => item.id !== id);
    dispatch(setCart(updatedCart)); 
  }

  return (
    <>
      <div className="w-[255px] h-[355px] pb-[10px] bg-white rounded-lg border border-gray-300 p-4 pt-6 mb-4 product-card" onClick={showModal}>
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
            <Tag className="text-sm text-[green]">Price: {product.price}</Tag>
            <div onClick={(e) => {
              e.stopPropagation();
            }}>

              {IsItemOnCard(product.id) ? (
                <div className="flex text-[red] p-t-[5px] p-b-[5px] items-center justify-around w-[100px] h-[32px] border rounded-md border-red-600 ">
                  <button className="border-0 p-0" onClick={() => cartItemCount(product.id, 'decr')}>
                    <TiMinus className="fill-[red] hover:opacity-80 w-[20px] h-[20px]" />
                  </button>
                  <h1 className="text-[1.2rem] text-[black]">
                    {IsItemOnCard(product.id) &&
                      (cartItems.find((item: Product) => item.id === product.id) as CartItem)?.count
                    }
                  </h1>
                  <button className="border-0 p-0" onClick={() => cartItemCount(product.id, 'incr')} >
                    <FaPlus className="fill-[red] hover:opacity-70 w-[20px] h-[20px]" />
                  </button>
                </div>
              ) : (
                <Button
                  title="Добавить в корзину"
                  className="text-sm p-t-[5px] p-b-[5px] w-[120px] border-red-700 flex items-center justify-center"
                  style={{ color: IsItemOnCard(product.id) ? "green" : "red" }}
                  onClick={() => AddToCart(product)}
                >
                  Добавить <BsCartDashFill style={{ width: 20, height: 20 }} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProductModal handleRemoveFromCart={handleRemoveFromCart} AddToCart={AddToCart} IsItemOnCard={IsItemOnCard} product={product} isModalVisible={isModalVisible} handleCancel={handleCancel} />
    </>
  );
}
