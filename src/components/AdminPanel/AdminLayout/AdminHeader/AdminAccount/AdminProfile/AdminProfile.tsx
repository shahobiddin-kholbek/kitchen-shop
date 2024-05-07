'use client'
import { setAdminData } from '@/provider/redux'
import { AppDispatch, RootState } from '@/provider/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AdminProfile() {
    const dispatch = useDispatch<AppDispatch>();
    // const [loading, setLoading] = React.useState(true);
    const { admin: adminFromLC } = useSelector((state: RootState) => state.filters)
    // const adminFromLC = admin?.admin
    // console.log("adminFromLC", adminFromLC);

    // useEffect(() => {
    //     const storedAdmin = localStorage.getItem("admin");
    //     if (storedAdmin) {
    //       dispatch(setAdminData(JSON.parse(storedAdmin)));
    //     }
    //     setLoading(false); 
    //   }, [dispatch, ]);
    //   if (loading) {
    //     return <div>Loading...</div>;
    //   }

    function handleLogout() {
        localStorage.removeItem('admin');
    }
    const formattedPhone = adminFromLC?.phone?.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1-$2-$3-$4');


    return (
        <div className="flex h-[60vh] items-center">
            <div className="h-[50vh] flex flex-col  gap-3">
                <h3>Ваш профиль</h3>
                {adminFromLC ? (
                        <div className="flex flex-col gap-2">

                            <h2 className='font-semibold'>
                                Name: {adminFromLC.name}
                            </h2>
                            <h2>Last name: {adminFromLC.lastName}</h2>

                            <p>Email: {adminFromLC.email}</p>
                            <p>Phone: {formattedPhone}</p>
                            <p>Access level: {adminFromLC.accessLevel}</p>
                        </div>

                ) : null}
                <button
                    className='text-[red] border-2 w-[100px] rounded-md px-2 py-1 border-red-600 hover:opacity-80'
                    onClick={handleLogout}>
                    Выход
                </button>
            </div>

        </div>
    )
}
