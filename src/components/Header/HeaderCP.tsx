'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaHistory } from "react-icons/fa";
import { ShoppingCartOutlined } from "@ant-design/icons";
import UserAccount from './UserAccount/UserAccount';
import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/provider/redux/store';
import './Cart/cart.css'
import LangSwitcher from './LangSwitcher/LangSwitcher';
import ThemeSwitcher from './Theme/Theme';
import { URLS_PAGES } from '@/config/pages-url.config';

export default function HeaderCP() {
  const { cart: cartData } = useSelector((state: RootState) => state.filters)

  return (
    <div className="h-[100px] flex justify-between items-center">
      <div className='flex items-center gap-10 '>
        <Link href={'/'} rel='preload'>
          <Image src='/img/logo.jpg' alt="Logo" width={100} title="Logo" height={100} priority={true} />
        </Link>
        <ThemeSwitcher />
      </div>

      <h1 className='text-[2rem]'>Kitchen Shop</h1>
      <div className="flex items-center gap-3">
        <LangSwitcher />
        <Link href={URLS_PAGES.ORDERS_HISTORY}>
          <FaHistory title='История заказов' style={{ fill: 'green', height: 23, width: 23 }} />
        </Link>
        <Link href={URLS_PAGES.CART}>
          <Badge count={cartData ? cartData.length : 0}>
            <ShoppingCartOutlined title="Корзина" />
          </Badge>
        </Link>
        <UserAccount />
      </div>
    </div>
  )
}
