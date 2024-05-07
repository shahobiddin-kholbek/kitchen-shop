import React from 'react';
import AuthForm from './user_auth/AuthForm';
import styles from './drawer.module.scss';
import UserProfile from './UserProfile/ProfileModal/ProfileModal';
import Link from 'next/link';
import AdminModalProfile from '@/components/AdminPanel/AdminLayout/AdminHeader/AdminAccount/AdminProfile/AdminModalProfile';

type DrawerProps = {
    setOpenAccountDrawer: (openAccountDrawer: boolean) => void;
    openAccountDrawer: boolean;
    setIsRegistered: (isRegistered: boolean) => void;
    isRegistered: boolean;
    isAdmin: boolean;
};

export default function AccountDrawer({
    setOpenAccountDrawer,
    openAccountDrawer,
    setIsRegistered,
    isRegistered,
    isAdmin
}: DrawerProps) {
 
    return (
        <div className='relative'>
            <div className={`${styles.drawer} ${openAccountDrawer ? styles.open : ''} dark:bg-[#2b2b2b] bg-white`}>
                <div className={`${styles.drawerHeader} bg-[#ccc] dark:bg-[#1a1919]`}></div>
                <div className={`${styles.drawerContent} dark:bg-[#2b2b2b] pb-[15px]`}>
                    {!isAdmin ? (
                        !isRegistered ? (
                            <AuthForm setOpenAccountDrawer={setOpenAccountDrawer} />
                        ) : (
                            <UserProfile setOpenAccountDrawer={setOpenAccountDrawer} setIsRegistered={setIsRegistered} />
                        )
                    ) : (
                        !isRegistered ? (
                            <div className="">
                                <Link href={'/admin/sign_up'}>
                                    <button
                                        onClick={() => setOpenAccountDrawer(false)}
                                        className={` p-[5px] border border-gray-800 dark:border-gray-500 rounded-md hover:opacity-80 text-gray-800 dark:text-gray-400 w-[200px] text-center`}
                                    >
                                        Вход
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <AdminModalProfile />
                        )
                    )}


                </div>
            </div>
            <div onClick={() => setOpenAccountDrawer(false)} className={`${styles.overlay} ${openAccountDrawer ? styles.open : ''}`}></div>
        </div>
    );
}
