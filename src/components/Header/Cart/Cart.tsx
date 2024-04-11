"use client"
import { useEffect, useState } from "react";
import { Badge, Button, Card, Drawer, message, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import './cart.css'
import { useAddOrderMutation } from "@/provider/redux/apies/ordersApi";
import { AddOrderArgs, Product, } from "@/Types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/provider/redux/store";
import { setCart } from "@/provider/redux";
import { CartItem } from "@/Types/cart_types";

export default function Cart() {
  const [open, setOpen] = useState<boolean>(false);
  const { cart: cartData = [] } = useSelector((state: RootState) => state.filters)
  const dispatch = useDispatch<AppDispatch>();

  const [addOrder, { isError: addOrderIsError, error: addOrderError, isSuccess: addOrderSuccess }] = useAddOrderMutation()

  useEffect(() => {
    if (addOrderSuccess) {
      message.success('Добавлено в закупки!')
      dispatch(setCart([]));
    } else if (addOrderIsError) {
      message.error('Ошибка заказа! Повторите позже')

    }
  }, [addOrderSuccess, addOrderIsError])

  const showDrawer = () => {
    setOpen((prev) => !prev);
  };

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

    try {
      const orderData: AddOrderArgs = {
        quantity: cartData.reduce((total, product) => total + product.count, 0),
        totalPrice: cartData.reduce((total, product) => total + (product.price * product.count), 0),
        customerId: "shahob",
        createdAt: new Date(),
        productsWithCount: cartData.map((product) => ({ id: product.id, count: product.count })),
      };
      await addOrder(orderData);
      
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  }

  return (
    <section className="cartSection">
      <Badge count={cartData ? cartData.length : 0}>
        <ShoppingCartOutlined onClick={showDrawer} />
      </Badge>

      <Drawer
        title="Корзина"
        onClose={showDrawer}
        open={open}
        className="relative"
      >
        {cartData && cartData.length ? (
          cartData.map((item: CartItem) => (
            <Card className="flex flex-col-reverse items-center" key={item.id}>
              <h1>
                {item.name} {' '} <Tag color="green">{item.price}$</Tag>{" "}
              </h1>
              <br />
              <img
                draggable={false}
                width={200}
                src={item.img[0]}
                alt={item.name}
              />{" "}
              <br />
              <Tag>Count: {item.count}</Tag>{" "}
              <Button onClick={() => cartItemCount(item.id, true)}>+</Button>{" "}
              <Button disabled={item.count === 1} onClick={() => cartItemCount(item.id, false)}>
                -
              </Button>{" "}
              <br />
              <Button
                style={{ outlineColor: "red", color: "red" }}
                onClick={() => DeleteItem(item.id)}
              >
                Delete
              </Button>
            </Card>
          ))
        ) : (
          <h1>Корзина пуста</h1>
        )}
        <div className="h-[57px]"></div>
        {cartData.length > 0 ? (
          <div className="fixed w-[311px] flex justify-around items-baseline border-gray-700 rounded-md border-[1px] p-3 bottom-[10px] bg-[white]">
            <Tag color="green" className="text-[1.05rem]">TotalPrice: {getTotalPrice()}$</Tag>
            <Button className="text-[red] border-red-500" onClick={AddToOrders}>Заказать</Button>
          </div>

        ) : null}
      </Drawer>
    </section>
  );
}
