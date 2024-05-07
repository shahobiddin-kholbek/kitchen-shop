'use client'
import { useAddUserMutation } from '@/provider/redux/apies/usersApi';
import { AppDispatch } from '@/provider/redux/store';
import { message } from 'antd';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from '../userForm.module.scss';
import { UserRegistration } from '@/Types/user_types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function UserRegister() {
    const t = useTranslations('signUpForm');
    const router = useRouter();
    const [userRegistration, setUserRegistration] = useState<UserRegistration>({
        id: uuidv4(),
        name: '',
        email: '',
        password: '',
        phone: '',
        isRegistered: false,
        createdAt: new Date().toISOString(),
    })
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [addUser, { isError: isAddUserError, error: addUserError, isSuccess: isAddUserSuccess }] = useAddUserMutation();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isAddUserSuccess) {
            router.push('/');
            message.success('Пользователь успешно зарегистрирован!');
        } else if (isAddUserError) {
            message.error('Ошибка при регистрации пользователя: ' + addUserError);
        }
    }, [isAddUserSuccess, isAddUserError, dispatch, userRegistration, addUserError]);

    const onUserFormChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setUserRegistration({ ...userRegistration, [name]: value });
    }, [userRegistration]);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await addUser(userRegistration);
            if ('data' in result) {
                const user = result.data;
                if (user) {
                    // localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    throw new Error('User not registered!');
                }

            } else {
                console.error('Ошибка при регистрации:', result.error);
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    }
    return (
        <div className={`${styles.user_form_container}`}>
            {isAddUserError && addUserError !== undefined && (
                <h1 className='text-[red] text-center mb-2'>
                    {(addUserError as any).status === 400 &&
                        (addUserError as any).data.message === 'User with this email already exists' ?
                        'Email уже зарегистрированa!' : (addUserError as any).status === 400 &&
                            (addUserError as any).data.message === "Password is required" ?
                            'Пароль не может быть пуст!' : (addUserError as any).data?.message}
                </h1>
            )}
            <form onSubmit={handleSignup} action="" className={`${styles.user_form}`}>
                <h1 className='text-[1.05rem] mb-1'>{t('title')}</h1>
                <label htmlFor="name">
                    {t('name')}: {" "}
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={userRegistration.name}
                        onChange={onUserFormChange}
                    />
                </label>

                <label htmlFor="email">
                    {t('email')}: {" "}
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={userRegistration.email}
                        onChange={onUserFormChange}
                        autoComplete='username'
                    />
                </label>
                <label htmlFor="password">
                    {t('password')}: {" "}
                    <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        value={userRegistration.password}
                        onChange={onUserFormChange}
                        autoComplete='current-password'

                    />
                </label>
                <label htmlFor="confirmPassword">
                    {t('confirmPassword')}: {" "}
                    <input
                        required
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete='current-password'
                    />
                </label>
                <label htmlFor="phone">
                    {t('phone')}: {" "}
                    <input
                        required
                        type="text"
                        id="phone"
                        name="phone"
                        value={userRegistration.phone}
                        onChange={onUserFormChange}
                    />
                </label>
                <button type='submit'>{t('submitButton')}</button> {" "}
            </form>
        </div>
    )
}
