'use client'
import { useSigninUserMutation } from '@/provider/redux/apies/usersApi';
import { message } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from '../userForm.module.scss';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type UserAuth = {
  email: string;
  password: string;
}

export default function UserSignInForm() {
  const t = useTranslations('signInForm');
  const router = useRouter();
  const [userAuth, setUserAuth] = useState<UserAuth>({
    email: '',
    password: '',
  });

  const [signinUser, { isSuccess: isSigninSuccess, isError: isSigninError, error: signinError, isLoading: signinLoading }] = useSigninUserMutation();


  useEffect(() => {
    if (isSigninSuccess) {
      router.push('/');
      message.success({
        content: 'Пользователь авторизован!',
        duration: 4,
      });
    }
  }, [isSigninSuccess]);

  const onAuthFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserAuth({ ...userAuth, [name]: value });
  }

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signinUser({ email: userAuth.email, password: userAuth.password });
      console.log(result);
      
      if ('data' in result) {
        const {user} = result.data;
        localStorage.setItem('user', JSON.stringify(user));
        console.log(message);
        
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  }
  return (
    <div className={`${styles.user_form_container}`}>
    {isSigninError && signinError !== undefined && (
      <h1 className='text-[red] text-center'>
        {(signinError as any).status === 400 ? 'Неверные учетные данные!' : (signinError as any).data?.message}
        </h1>
    )}
      <form onSubmit={handleSignin} action="" className={`${styles.user_form}`}>
        <h1 className='mb-4 text-[1.2rem]'>{t('title')}</h1>
        <label htmlFor="email">
          {t('email')}: {" "}
          <input
            required
            type="email"
            id="email"      
            name="email"
            value={userAuth.email}
            onChange={onAuthFormChange}
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
            value={userAuth.password}
            onChange={onAuthFormChange}
            autoComplete='current-password'
          />
        </label>
        <button type='submit'>{t('submitButton')}</button>
      </form>
    </div>
  )
}
