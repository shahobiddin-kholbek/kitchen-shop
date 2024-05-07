"use client"
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import AccountDrawer from './Drawer/AccountDrawer';
import styles from './userAccount.module.scss';
import { setUser } from '@/provider/redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/provider/redux/store';

export default function UserAccount() {
    const [openAccountDrawer, setOpenAccountDrawer] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser && storedUser !== 'undefined') {
            const userFromLocalStorage = JSON.parse(storedUser || '{}');
            
            if (userFromLocalStorage) {
                const { name } = userFromLocalStorage || {};
                dispatch(setUser(userFromLocalStorage));
                setIsRegistered(true);
                setUserName(name?.charAt(0).toUpperCase());
            }
        }
    }, []);

    return (
        <div className={`${styles.user_account} relative`}>
            {!isRegistered ? (
                <FaUserCircle
                    style={{
                        width: 23, height: 23, cursor: 'pointer',
                        borderRadius: openAccountDrawer ? '50%' : '0',
                        boxShadow: openAccountDrawer ? '0 0 8px 2px rgba(0, 0, 0, 0.7)' : 'none',
                    }}
                    onClick={() => setOpenAccountDrawer(true)} />
            ) : (
                <div
                    className='border cursor-pointer rounded-[50%] text-center w-[25px] h-[25px] bg-[#d42f4a] text-[white] font-semibold'
                    onClick={() => setOpenAccountDrawer(true)}
                    style={{
                        boxShadow: openAccountDrawer ? '0 0 8px 2px rgba(0, 0, 0, 0.7)' : 'none',
                    }}
                >
                    {userName}
                </div>
            )}

            {openAccountDrawer && <AccountDrawer
                isAdmin={false}
                setOpenAccountDrawer={setOpenAccountDrawer}
                openAccountDrawer={openAccountDrawer}
                isRegistered={isRegistered}
                setIsRegistered={setIsRegistered}
            />}
        </div>
    );
}
