'use client'
import { RootState } from '@/provider/redux/store'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

export default function AdminModalProfile() {
    const { admin: adminFromLC } = useSelector((state: RootState) => state.filters)
    console.log("adminFromLC", adminFromLC);
    
    function handleLogout() {
        localStorage.removeItem('admin');
        window.location.reload();
    }
    const formattedPhone = adminFromLC?.phone?.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1-$2-$3-$4');

    return (
        <div className="flex flex-col items-center gap-2">
            <h3>Ваш профиль</h3>
            {adminFromLC && (
                <div className="flex flex-col items-center gap-2">
                    <Link href={'/admin/profile'}>
                    <div
                        className='border cursor-pointer rounded-[50%] flex items-center justify-center w-[40px] h-[40px] bg-[#d42f4a] text-[white] font-semibold'
                    >
                        {adminFromLC.name?.charAt(0).toUpperCase()}
                    </div>
                    </Link>
                    <h2 className='font-semibold'>{adminFromLC.name} {adminFromLC.lastName?.substring(0, 2)}</h2>

                    <p>{adminFromLC.email}</p>
                    <p>{formattedPhone}</p>
                </div>
            )}

            <Button className='text-[red] border-red-600' onClick={handleLogout}>Выход</Button>
        </div>
    )
}
