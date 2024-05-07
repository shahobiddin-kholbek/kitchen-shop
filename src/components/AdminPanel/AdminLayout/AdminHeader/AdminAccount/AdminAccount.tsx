"use client"
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import styles from '../../../../Header/UserAccount/userAccount.module.scss';
import { setAdminData } from '@/provider/redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/provider/redux/store';
import AccountDrawer from '@/components/Header/UserAccount/Drawer/AccountDrawer';

export default function AdminAccount() {
    const [openAccountDrawer, setOpenAccountDrawer] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminName, setAdminName] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin !== null) {
            const adminFromLocalStorage = JSON.parse(storedAdmin || '{}');

            if (adminFromLocalStorage) {
                const { name } = adminFromLocalStorage || {};
                dispatch(setAdminData(adminFromLocalStorage));
                setIsRegistered(true);
                setIsAdmin(true);
                setAdminName(name?.charAt(0).toUpperCase());
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
                    {adminName}
                </div>
            )}

            {openAccountDrawer && <AccountDrawer
                setOpenAccountDrawer={setOpenAccountDrawer}
                openAccountDrawer={openAccountDrawer}
                isRegistered={isRegistered}
                setIsRegistered={setIsRegistered}
                isAdmin={isAdmin}
            />}
        </div>
    );
}
