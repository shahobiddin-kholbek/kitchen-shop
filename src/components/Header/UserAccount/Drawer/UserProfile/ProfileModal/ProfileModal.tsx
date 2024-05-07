import React from 'react';
import { UserProfileProps } from '@/Types/user_types';
import Link from 'next/link';
import { useLogoutUserMutation } from '@/provider/redux/apies/usersApi';
import { useRouter } from 'next/navigation';

const UserProfile: React.FC<UserProfileProps> = ({ setOpenAccountDrawer }) => {
    // const { user } = useSelector((state: RootState) => state.filters)
    const [logoutUser] = useLogoutUserMutation();
    const router = useRouter();
    const userFromLC = localStorage.getItem('user');
    const user = userFromLC ? JSON.parse(userFromLC) : null;

    const handleLogout = async () => {
        localStorage.removeItem('user');
        await logoutUser();
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();
        router.push('/login');
    }
    const formattedPhone = user?.phone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1-$2-$3-$4');

    return (
        <div className="flex flex-col items-center gap-2">
            <h3>Ваш профиль</h3>
            {user && (
                <div className="flex flex-col items-center gap-2">
                    <Link href={'/profile'}>
                        <div
                            onClick={() => setOpenAccountDrawer(false)}
                            className='border rounded-[50%] flex items-center justify-center w-[40px] h-[40px] bg-[#d42f4a] text-[white] font-semibold'
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </Link>

                    <h2 className='font-semibold' >{user.name}</h2>

                    <p>{user.email}</p>
                    <p>{formattedPhone}</p>
                </div>
            )}

            <button
                className='text-[red] border border-red-600 p-2 rounded-lg hover:opacity-80'
                onClick={handleLogout}>
                Выход
            </button>
        </div>
    );
};

export default UserProfile;
