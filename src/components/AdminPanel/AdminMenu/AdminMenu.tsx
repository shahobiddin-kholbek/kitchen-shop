'use client'
import { URLS_PAGES } from '@/config/pages-url.config'
import { usePathname } from '@/navigation'
import Link from 'next/link'
import React from 'react'

const menuLinksArr = [
  {
    label: 'Главная',
    path: URLS_PAGES.ADMIN_PAGE
  },
  {
    label: 'Все Товары',
    path: URLS_PAGES.ALL_PRODUCTS
  },
  {
    label: 'Add product',
    path: URLS_PAGES.ADD_PRODUCT
  },
  {
    label: 'Профиль',
    path: URLS_PAGES.ADMIN_PROFILE
  }
]

export default function AdminMenu() {
  const pathname = usePathname()
  return (
    <ul className='flex mt-3 gap-2 justify-center'>
      {menuLinksArr.map((item, i) => (
        <li key={i}>
          <Link href={item.path} className={pathname === item.path ?
            'text-orange-500 font-extrabold dark:text-orange-800 ' :
            'text-black dark:text-white'
          }>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
