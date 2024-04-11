import React from 'react'
import logo from "../../../public/img/logo.jpg";
import Link from 'next/link';
import Image from 'next/image';

import { FaHistory } from "react-icons/fa";
import Cart from './Cart/Cart';


export default function HeaderCP() {
  return (
    <div className="h-[100px] flex justify-between items-center">
      <Link href={'/'}><Image src={logo} alt="Logo" width={100} title="Logo" priority={true} /></Link>
      <h1 className='text-[2rem]'>Kitchen Shop</h1>
      <div className="flex items-center gap-3">
        <Link href={'/orders_history'}>
          <FaHistory style={{fill: 'green', height: 23, width: 23}}/>
        </Link>
        <Cart />
      </div>
    </div>
  )
}
