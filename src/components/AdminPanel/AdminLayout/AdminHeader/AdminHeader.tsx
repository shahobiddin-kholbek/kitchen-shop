import LangSwitcher from '@/components/Header/LangSwitcher/LangSwitcher'
import ThemeSwitcher from '@/components/Header/Theme/Theme'
import Image from 'next/image'
import Link from 'next/link'
import AdminAccount from './AdminAccount/AdminAccount'

export default function AdminHeader() {
    return (
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-10 '>
                <Link href={'/'} rel='preload'>
                    <Image src='/img/logo.jpg' alt="Logo" width={100} title="Logo" height={100} priority={true} />
                </Link>
                <ThemeSwitcher />
            </div>

            <h1 className='text-[2rem]'>Kitchen Shop</h1>
            <div className="flex items-center gap-3">
                <LangSwitcher />
                <AdminAccount />
            </div>
        </div>
    )
}
