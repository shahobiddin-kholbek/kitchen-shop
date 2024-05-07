import React from 'react'

import Link from 'next/link';

type AuthFormProps = {
    setOpenAccountDrawer: (openAccountDrawer: boolean) => void
}

export default function AuthForm({ setOpenAccountDrawer }: AuthFormProps) {
    return (
        <div className="flex flex-col items-center gap-2 mt-3">
            <Link href={'/register'}>
                <button
                    onClick={() => setOpenAccountDrawer(false)}
                    className={`p-[5px] border border-red-600  rounded-md hover:opacity-80 text-red-600 w-[200px] text-center`}
                >
                    Зарегистрироваться
                </button>
            </Link>
            <Link href={'/sign_up'}>
                <button
                    onClick={() => setOpenAccountDrawer(false)}
                    className={` p-[5px] border border-gray-800 dark:border-gray-500 rounded-md hover:opacity-80 text-gray-800 dark:text-gray-400 w-[200px] text-center`}
                >
                    Вход
                </button>
            </Link>


        </div>
    )
}
