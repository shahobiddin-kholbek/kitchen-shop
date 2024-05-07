'use client'
import { useDeleteOrderMutation, useGetOrdersQuery } from '@/provider/redux/apies/ordersApi'
import { RootState } from '@/provider/redux/store'
import { Button, message, Tag } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TbMoodEmpty } from "react-icons/tb";
import Link from 'next/link'

export default function OrdersHistory() {
    const { user } = useSelector((state: RootState) => state.filters)
    const { data: orders = [], isLoading } = useGetOrdersQuery({ customerId: user?.id ? user.id : '' });
    const [deleteOrder, { isError: deleteOrderIsError, isSuccess: deleteOrderSuccess }] = useDeleteOrderMutation()

    useEffect(() => {
        if (deleteOrderSuccess) {
            message.success('Успешно удалено!')
        } else if (deleteOrderIsError) {
            message.error('Ошибка при удалении!')
        }
    }, [deleteOrderIsError, deleteOrderSuccess])

    const deleteTheOrder = async (id: string) => {
        try {
            await deleteOrder(id)
        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <div className="container mx-auto py-8">
            {orders.length > 0 && <h1 className="text-2xl text-center font-bold mb-4">История покупок</h1>}
            {user && user.isRegistered ? (
                orders.length > 0 ? (
                    orders.map((order, i) => (
                        <div key={i} className=" border-4 rounded-lg p-4 mb-4">
                            {order.products.map((product: any) => (
                                <div key={product.id} className="flex items-center mb-4">
                                    <img src={product.img[0]} alt={product.name} className="w-24 h-24 mr-4" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <p className="text-gray-600">{product.description}</p>
                                        <p className="mb-2"><strong>Цена:</strong> {product.price}$</p>
                                        <p className="mb-2"><strong>Количество:</strong> {product.count}</p>

                                    </div>
                                </div>
                            ))}
                            <p className="mb-2"><strong>Дата покупки:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            <p className="mb-2"><strong>Количество покупок:</strong> {order.quantity}</p>
                            <Tag bordered={false} className='text-[1.2rem]' color="green">Общая цена: {order.totalPrice}$</Tag>
                            <Button style={{ outlineColor: "red", color: "red" }} className="ml-4" onClick={() => deleteTheOrder(order.id)}>Удалить</Button>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center">{isLoading ? 'Loading...' : 'Нет заказов'}</h1>
                )
            ) : (
                <div className="flex h-[50vh] flex-col gap-4 items-center justify-center">
                    <h1>Для просмотра истории покупок необходимо зарегистрироваться</h1>
                    <TbMoodEmpty style={{ height: 100, width: 100, stroke: 'red' }}/>
                    <Link className='text-red-600 hover:opacity-80' href={'/register'}>Зарегистрироваться</Link>
                </div>
            )
            }

        </div>

    )
}
