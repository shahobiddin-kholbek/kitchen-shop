"use client"
import { useEffect, useState } from "react";
import { message, Tag } from "antd";
import './cart.css'
import { useAddOrderMutation } from "@/provider/redux/apies/ordersApi";
import { AddOrderArgs, } from "@/Types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider/redux/store";
import { setCart } from "@/provider/redux";
import { CartItem } from "@/Types/cart_types";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { TiDeleteOutline } from "react-icons/ti";
import emptyCart from '/public/img/cart/emptyCart.png'
import Link from "next/link";
import { useTranslations } from "next-intl";
export default function Cart() {
  const t = useTranslations('cart')
  const { cart: cartData = [], user } = useSelector((state: RootState) => state.filters)

  const dispatch = useDispatch<AppDispatch>();
  const [addOrder, { isError: addOrderIsError, error: addOrderError, isSuccess: addOrderSuccess }] = useAddOrderMutation()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (addOrderSuccess) {
      message.success(t('orderSuccess'))
      dispatch(setCart([]));
    } else if (addOrderIsError) {
      message.error(t('orderError'))

    }
  }, [addOrderSuccess, addOrderIsError])
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart)));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getTotalPrice = () => {
    if (!cartData) return 0;

    const totalPrice = cartData.reduce((total: number, item: CartItem) => {
      const price = item.price;
      const quantity = item.count;
      return total + (price * quantity);
    }, 0);

    return totalPrice;
  };

  const cartItemCount = (id: string, incr: boolean) => {
    const updatedCartData = cartData.map((item: CartItem) => {
      if (item.id === id) {
        if (incr) {
          return { ...item, count: item.count + 1 };
        } else {
          return { ...item, count: Math.max(item.count - 1, 1) };
        }
      }
      return item;
    });

    dispatch(setCart(updatedCartData));
  };

  async function DeleteItem(id: string) {
    const updatedCartData = cartData.filter((item: CartItem) => item.id !== id);
    dispatch(setCart(updatedCartData));
  }

  async function AddToOrders() {
    if (!cartData) {
      return;
    }
    if (user?.isRegistered) {
      try {
        const orderData: AddOrderArgs = {
          quantity: cartData.reduce((total, product) => total + product.count, 0),
          totalPrice: cartData.reduce((total, product) => total + (product.price * product.count), 0),
          customerId: user?.id,
          createdAt: new Date(),
          productsWithCount: cartData.map((product) => ({ id: product.id, count: product.count })),
        };
        await addOrder(orderData);

      } catch (error) {
        console.error("Ошибка при оформлении заказа:", error);
      }
    } else {
      message.error('Вы не зарегистрированы!')
    }

  }

  return (
    <section className="cartSection relative mb-8">
      <ul className="relative w-full overflow-y-scroll h-[500px]">
        {cartData && <h1 className="text-2xl text-center font-bold mb-4">{t('title')}</h1>}
        {cartData.length ? (
          cartData.map((item: CartItem) => (
            <li className="p-5 dark:shadow-slate-800 shadow-md justify-around rounded-md flex gap-5 items-center" key={item.id}>
              <Image
                draggable={false}
                width={200}
                height={200}
                src={item.img[0]}
                alt={item.name}
                className="rounded-md"
              />
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl">
                  {item.name} {' '} <Tag color="green" className="text-lg">{item.price}$</Tag>
                </h1>
                <p className="text-italic w-[355px]">{item.description}</p>
                <div className="flex flex-col gap-3">
                  <span>{t('count')}: {' '}
                    <span className="text-md">
                      {item.count}
                    </span>
                  </span>
                  <div className="flex gap-5">
                    <div className="border p-1 border-red-500 rounded-md w-[90px] flex justify-around">
                      <button className="hover:opacity-50 border-none"
                        onClick={() => cartItemCount(item.id, true)}
                      >
                        <FaPlus style={{ color: "red", fontSize: "20px" }} />
                      </button>
                      <button className="hover:opacity-50 border-none"
                        disabled={item.count === 1}
                        onClick={() => cartItemCount(item.id, false)}>
                        <TiMinus style={{ color: "red", fontSize: "20px", }} />
                      </button>
                    </div>
                    <div className="">
                      <p>{t('totalProductPrice')}: {item.price * item.count}$</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-[60px] h-[100px] rounded-md hover:opacity-80 flex justify-center items-center border border-red-500"
                style={{ outlineColor: "red", color: "red" }}
                onClick={() => DeleteItem(item.id)}
              >
                <TiDeleteOutline style={{ color: "red", fontSize: "20px", width: "40px", height: "40px" }} />
              </button>
            </li>
          ))
        ) : (
          <div className="h-[60vh] flex flex-col justify-center items-center">
            <Image src={emptyCart} alt="empty cart" width={200} height={200} />
            <h1 className="text-3xl mb-4">{t('empty')}</h1>
            <Link className="text-red-500 hover:opacity-80" href={'/products'}>
              {t('backToProducts')}
            </Link>
          </div>
        )}
        <div className="h-[50px]"></div>

      </ul>
      {cartData.length > 0 ? (
        <div className="absolute bottom-3 right-3 w-[351px] flex justify-around items-baseline border-gray-700 rounded-md border-[1px] p-3 bg-[white] dark:bg-[#2b2b2b]">
          <span className="text-[1.05rem] p-1 ">{t('totalPrice')}: {getTotalPrice()}$</span>
          <button
            className="text-[red] px-4 py-2 rounded-md border border-red-500 hover:opacity-80"
            onClick={AddToOrders}
          >
            {t('order')}
          </button>
        </div>
      ) : null}
    </section>
  );
}
