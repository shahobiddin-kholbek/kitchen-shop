'use client'
import { RootState } from '@/provider/redux/store'
import { Button } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

export default function UserInfo() {
    const { user } = useSelector((state: RootState) => state.filters)
    function handleLogout() {
        localStorage.removeItem('user');
        window.location.reload();
    }
    const formattedPhone = user?.phone?.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1-$2-$3-$4');
    
    return (
        <div className="flex flex-col items-center gap-2">
            <h3>Ваш профиль</h3>
            {user && (
                <div className="flex flex-col items-center gap-2">
                    <div
                        className='border cursor-none rounded-[50%] flex items-center justify-center w-[40px] h-[40px] bg-[#d42f4a] text-[white] font-semibold'
                    >
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2 className='font-semibold'>{user.name}</h2>

                    <p>{user.email}</p>
                    <p>{formattedPhone}</p>
                </div>
            )}

            <Button className='text-[red] border-red-600' onClick={handleLogout}>Выход</Button>
        </div>
    )
}
