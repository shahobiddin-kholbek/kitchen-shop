'use client'
import React, { useEffect } from 'react'
import styles from '../../../Header/UserAccount/Drawer/user_auth/userForm.module.scss'
import { SignInAdmin } from '@/Types/admin_types';
import { useSignInAdminMutation } from '@/provider/redux/apies/adminApi';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
    const [signInAdmin, { isError: isSigninError, error: signinError, isSuccess: isSigninSuccess }] = useSignInAdminMutation();
    const [admin, setAdmin] = React.useState<SignInAdmin>({
        email: '',
        password: '',
    });

    const router = useRouter();

    useEffect(() => {
        if (isSigninError) {
            message.error('Sign in error')
        } else if (isSigninSuccess) {
            message.success('Sign in success')
            router.push('/admin-page')
            window.location.reload();
        }
    }, [isSigninError, isSigninSuccess])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signInAdmin({ email: admin.email, password: admin.password });
            if ('data' in result) {
                const admin = result.data;
                const { admin: data } = admin;
                localStorage.setItem('admin', JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className={`${styles.user_form_container} h-[60vh]`}>
            <form onSubmit={handleSubmit} className={`${styles.user_form}`}>
                <h1>Sign Up</h1>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={admin.email}
                        onChange={handleChange}
                        autoComplete='username'
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={admin.password}
                        onChange={handleChange}
                        autoComplete='current-password'
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
